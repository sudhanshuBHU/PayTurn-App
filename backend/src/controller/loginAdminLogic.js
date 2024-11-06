const admins = require('../models/adminTable');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const u = await admins.findOne({ username });
        if (!u) {
            return res.status(404).json({
                message: "Admin not found",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(password, u.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            });
        }
        const token = jwt.sign({ username: username }, `${process.env.JWT_SECRET}`);
        res.json({
            message: "Admin logged in successfully",
            success: true,
            token: token,
            name: u.name,
            username: u.username
        });

    } catch (error) {
        res.json({
            success: false,
            message: "try login again " + err
        });

    }
}

module.exports = loginAdmin;