const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: false
    },
    tokenExpire:{
        type: Date,
        required: false
    }
});