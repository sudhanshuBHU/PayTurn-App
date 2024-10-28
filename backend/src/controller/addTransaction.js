const transaction = require('../models/transactionTable');

async function addTransaction(req, res) {
    const { payer, payee, price, date, time, description, payer_username, payee_username } = req.body;
    let status = true;
    try {
        const newTransaction = new transaction({ payer, payee, price, date, time, description, status, payer_username, payee_username });
        const savedTransaction = await newTransaction.save();
        res.json({
            message: "Transaction added successfully",
            // data: savedTransaction,
            success: true
        });
    } catch (err) {
        res.json({
            success: false,
            message: err
        });
    }
}
module.exports = addTransaction;