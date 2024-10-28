const express = require('express');
const signUp = require('../controller/signUpLogic');
const login = require('../controller/loginLogic');
const router = express.Router();

const { signUpValidation } = require('../middlewares/AuthValidation');
const { loginValidation } = require('../middlewares/AuthValidation');

router.post('/login', loginValidation, login);
router.post('/signup', signUpValidation, signUp);

router.post('/forgotPassword', (req, res) => {
    res.send("Forgot Password Page");
});



module.exports = router;
