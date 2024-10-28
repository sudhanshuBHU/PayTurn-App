const express = require('express');
const router = express.Router();
const addTransaction = require('../controller/addTransaction');
const { findAllTransactionPayee } = require('../controller/findAllTransaction');
const { findAllTransactionPayer } = require('../controller/findAllTransaction');
const { checkUsername } = require('../controller/findAllTransaction');
const { addTransactionValidation } = require('../middlewares/AuthValidation');
const { findAllMembers } = require('../controller/findAllTransaction');

router.post('/newTransaction', addTransaction);
router.get('/allTransactionPayer', addTransactionValidation, findAllTransactionPayer);
router.get('/allTransactionPayee', addTransactionValidation, findAllTransactionPayee);
router.get('/allMembers', addTransactionValidation, findAllMembers);
router.get('/checkUsername', checkUsername);

module.exports = router;