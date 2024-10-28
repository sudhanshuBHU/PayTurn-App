const user = require('../models/userTable');
const bcrypt = require('bcrypt');
const signUp = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const newUser = new user({ name, username, password });
        const newPass = await bcrypt.hash(password, 10);
        newUser.password =  newPass;
        const savedUser = await newUser.save();
        res.json({
            message: "user created successfully",
            success: true,
            data: savedUser
        });
        console.log("saved successfully");
        
    } catch (err) {
        console.log("error at signUp", err);
        res.json({ message: err });
    }
}

module.exports = signUp;