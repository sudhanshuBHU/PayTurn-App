const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 2,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true});

const users = mongoose.model('users', user);
module.exports = users;