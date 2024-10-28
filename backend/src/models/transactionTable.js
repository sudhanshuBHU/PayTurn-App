const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
    },
    payee: {
        type: String,
        required: true,
    },
    payee_username: {
        type: String,
        required: true,
    },
    payer: {
        type: String,
        required: true,
    },
    payer_username: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
},{timestamps: true});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;