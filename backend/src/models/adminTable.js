const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    name: { type: String, required: true },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const admins = mongoose.model('admin', admin);
module.exports = admins;