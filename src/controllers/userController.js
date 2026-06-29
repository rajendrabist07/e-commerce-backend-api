const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        success: true,
        message: "User Registered",
        data: {
            user,
        },
    });

});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );

    res.status(200).json({
        success: true,
        message: "Login Successful",
        data: {
            user,
            token,
        },
    });

});

const getUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

const adminOnly = (req, res, next) => {

    if (
        req.user &&
        req.user.role === "admin"
    ) {

        next();

    } else {

        return res.status(403).json({
            success: false,
            message: "Admin Access Only",
        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    getUser,
    adminOnly,
};
