const express = require('express');
const router = express.Router();
const Login = require('../models/login');

// Register a new user
router.post('/register', async (req, res) => {
    // Get the username, password, and email from the request
    const { username, password, email } = req.body;

    // Create a new login object with the username, password, and email
    const login = new Login({
        username,
        password,
        email
    });

    // Hash the password
    login.password = await login.hashPassword(password);

    // Try to save the login object to the database
    try {
        const l1 = await login.save();
        res.json(l1);
    } catch (err) {
        // If there was an error, return an error
        res.send('Error');
    }

});

// Login a user
router.post('/login', async (req, res) => {
    // Get the username and password from the request
    const { username, password } = req.body;



    // Try to find the user in the database
    try {
        const user = await Login.find({ username });
        // If the user was not found, return an error
        if (user.length === 0) {
            return res.send('User not found');
        }

        // Check if the password is not correct
        if (!await user[0].validatePassword(password)) {
            return res.send('Password not correct');
        }

        // Generate a token
        const token = await user[0].generateAuthToken();

        // Save the token to the database
        user[0].token = token;
        user[0].tokenExpire = Date.now() + 3600000;
        await user[0].save();

        // Return the token
        res.send(token);

    } catch (err) {
        res.send('Error');
    }
});

// Logout a user
router.post('/logout', async (req, res) => {
    // Get the token from the request
    const { token } = req.body;

    // Try to find the user in the database
    try {
        const user = await Login.find({ token });
        // If the user was not found with the token, this isn't a problem
        if (user.length === 0) {
            return res.send('User not found');
        }

        // Remove the token from the database
        user[0].token = '';
        user[0].tokenExpire = Date.now();
        await user[0].save();

        // Return a success message
        res.send('Success');

    } catch (err) {
        res.send('Error');
    }
});

// Get the information for a user
router.get('/user', async (req, res) => {
    // Get the token from the request
    const { token } = req.body;

    // Check if the token is valid
    if (!await checkToken(token)) {
        return res.send('Invalid token');
    }

    // Try to find the user in the database
    try {
        const user = await Login.find({ token });
        // If the user was not found with the token, return an error
        if (user.length === 0) {
            return res.send('User not found');
        }

        // Return the user
        res.json(user[0]);

    } catch (err) {
        res.send('Error');
    }
});

// This function gets the token and checks if it is valid
const checkToken = async (token) => {
    // Try to find the user in the database
    try {
        const user = await Login.find({ token });
        // If the user was not found with the token, return false
        if (user.length === 0) {
            return false;
        }

        // Check if the token has expired
        if (user[0].tokenExpire < Date.now()) {
            return false;
        }

        // Return true
        return true;

    } catch (err) {
        return false;
    }
}
