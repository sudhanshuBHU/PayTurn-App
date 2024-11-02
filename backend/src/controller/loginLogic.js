const user = require('../models/userTable');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const u = await user.findOne({ username });
        // console.log(u);
        if (!u) {
            res.json({ 
                message: `${username} - user not found in our database`,
                success: false,
                username: username
            });
            return;
        }
        const isMatch = await bcrypt.compare(password, u.password);
        // console.log(isMatch);

        if (!isMatch) {
            res.json({ 
                success: false,
                message: "password not matched" 
            });
            return;
        }
        const token = jwt.sign({ username: username }, `${process.env.JWT_SECRET}`);

        // console.log("loged in");
        res.json({
            message: "login successfully",
            success: true,
            username: username,
            token: token,
            name: u.name
        });
    } catch (err) {
        console.log("error at login", err);
        res.json({
            success: false,
            message: "try login again " + err
        });
    }
};

module.exports = login;