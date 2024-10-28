const Feedback = require('../models/feedback');

const contactLogic = async (req, res) => {
    const { name, email, description } = req.body;
    try {
        const newFeedback = new Feedback({ name, email, description });
        const savedFeedback = await newFeedback.save();
        res.json({
            message: "Feedback added successfully",
            success: true
        });
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        });
    }
}

module.exports = contactLogic;