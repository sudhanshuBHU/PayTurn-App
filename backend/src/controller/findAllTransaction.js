const Transaction = require('../models/transactionTable');
const users = require('../models/userTable');

const findAllTransactionPayer = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $and: [
                { payer_username: req.query.payer_username }
            ]
        });

        res.json({
            success: true,
            data: transactions,
            message: 'All transactions ( payer ) fetched successfully'
        });
    } catch (err) {
        res.json({ message: err.message, success: false, type: "payer" });
    }
};

const findAllTransactionPayee = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $and: [
                { payee_username: req.query.payee_username }
            ]
        });

        res.json({
            success: true,
            data: transactions,
            message: 'All transactions ( payee ) fetched successfully'
        });
    } catch (err) {
        res.json({ message: err.message, success: false, type: "payee" });
    }
};

const findAllMembers = async (req, res) => {
    let arr = [];
    try {
        const members = await users.find();
        for (let i = 0; i < members.length; i++) {
            arr.push(
                {
                    name: members[i].name,
                    username: members[i].username
                }
            );
        }
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
    res.json({
        success: true,
        data: arr,
        message: 'All members fetched successfully'
    });
}

const allMembers = async (req, res) => {
    try {
        const members = await users.find();
        res.json({
            success: true,
            data: members,
            message: 'All members fetched successfully'
        });
    } catch (error) {
        res.json({ message: err.message, success: false });
    }
}

const checkUsername = async (req, res) => {
    let flag = true;
    try {
        const member = await users.findOne({ username: req.query.username });
        if (member) {
            flag = false;
        }
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
    res.json({
        success: true,
        flag: flag
    });
}

module.exports = { allMembers, findAllTransactionPayee, findAllTransactionPayer, findAllMembers, checkUsername };
