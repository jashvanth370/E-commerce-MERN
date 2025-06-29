const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0 || !users) {
            return res.status(200).json({ message: "Users not here . " });
            console.log("dskasfkj");
        }
        return res.status(200).json({ users: users });
    } catch (error) {
        console.log()
        res.status(400).json({ message: "Internal server error ." });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, password, profilePic } = req.body;

        const updatedFields = {};

        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;
        if (profilePic) updatedFields.profilePic = profilePic;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.body._id;
        if (!userId) {
            res.status(404).json({ message: " User Not Found" });
            return res;
        }
        const user = await User.findById(userId);
        res.status(200).json({ user: user });
    } catch (error) {
        console.error("User fetch Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

