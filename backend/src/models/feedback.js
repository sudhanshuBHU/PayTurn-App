const mongoose = require('mongoose');

const feedback = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Feedback = mongoose.model('Feedback', feedback);
module.exports = Feedback;