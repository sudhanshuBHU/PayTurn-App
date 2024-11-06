const z = require('zod');
const user = require('../models/userTable');
const jwt = require('jsonwebtoken');


const signUpValidation = async (req, res, next) => {

    const signupSchema = z.object({
        name: z.string().min(3),
        username: z.string().min(4),
        password: z.string().min(4),
        rePassword: z.string().min(4),
    });

    try {
        const { name, username, password, rePassword } = req.body;
        const inputData = {
            name,
            username,
            password,
            rePassword,
        };
        const parsedData = signupSchema.parse(inputData);
        if (password !== rePassword) {
            res.json({ message: "password not matched" });
            return;
        }
        const u = await user.findOne({ username });
        if (u) {
            res.json({ message: "user already exists" });
            return;
        }
        next();
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ error: error.message });
    }
}

const loginValidation = async (req, res, next) => {
    const loginSchema = z.object({
        username: z.string().min(4),
        password: z.string().min(4),
    });
    try {
        const parsedData = loginSchema.parse(req.body);
        next();
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ error: error.message });
    }
}

const addTransactionValidation = async (req, res, next) => {
    const token = req.headers['token'];
    try {
        if (!token) {
            res.status(400).send({ error: "token not found", success: false });
            return;
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (!verify) {
            res.status(400).send({ error: "token not valid", success: false });
            return;
        }
        req.userToken = verify;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(
            400
        ).send({ error: error.message, success: false });
        return;
    }
}
module.exports = { signUpValidation, loginValidation, addTransactionValidation };
