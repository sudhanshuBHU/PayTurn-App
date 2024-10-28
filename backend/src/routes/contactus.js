const express = require('express');
const router = express.Router();
const contactLogic = require('../controller/contactLogic');

router.post('/contactUs', contactLogic);

module.exports = router;