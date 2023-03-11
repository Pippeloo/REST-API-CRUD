const express = require('express');
const mongoose = require('mongoose');

// Check if the MONGO_URI environment variable is set
if (!process.env.MONGO_URL) {
    throw new Error('Please set the MONGO_URI environment variable');
}

const url = process.env.MONGO_URL + "/" + (process.env.MONGO_DB || 'default')

const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.use(express.json());

const alienRouter = require('./routers/aliens');
app.use('/aliens', alienRouter);

app.listen(3000, () => {
    console.log('Server started');
});