const admins = require('../models/adminTable');
const bcrypt = require('bcrypt');

const signupLogicAdmin = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const newAdmin = new admins({ name, username, password });
        const newPass = await bcrypt.hash(password, 10);
        newAdmin.password = newPass;
        const savedAdmin = await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", success: true, data: savedAdmin });
    } catch {
        res.status(500).json({ message: 'Error in signup logic admin', success: false });
    }
}

module.exports = signupLogicAdmin;