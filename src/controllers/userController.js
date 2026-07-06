const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateResetToken = require("../utils/generateToken");

const emailService =
    require("../services/emailService");

const welcomeEmail =
    require("../templates/welcomeEmail");

const sanitizeUser = (user) => {

    const safeUser = user.toObject
        ? user.toObject()
        : { ...user };

    delete safeUser.password;

    delete safeUser.resetPasswordToken;

    delete safeUser.resetPasswordExpire;

    return safeUser;

};


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
            user: sanitizeUser(user),
        },
    });

    await emailService.sendEmail(

        user.email,

        "Welcome To Ecommerce",

        welcomeEmail(user.name)

    );

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
            user: sanitizeUser(user),
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

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const user =
        await User.findOne({ email });

    if (!user) {

        res.status(404);

        throw new Error("User Not Found");

    }

    const resetToken =
        generateResetToken();

    user.resetPasswordToken =
        resetToken;

    user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000;

    await user.save();

    const resetUrl =
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await emailService.sendEmail(

        user.email,

        "Reset Password",

        `
        <h2>Password Reset</h2>

        <p>

        Click below link

        </p>

        <a href="${resetUrl}">

        Reset Password

        </a>
        `

    );

    res.status(200).json({

        success: true,

        message:
            "Password Reset Email Sent",

    });

});

// Reset Password

const resetPassword = asyncHandler(async (req, res) => {

    const token =
        req.params.token;

    const user =
        await User.findOne({

            resetPasswordToken:
                token,

            resetPasswordExpire: {

                $gt: Date.now(),

            },

        });

    if (!user) {

        res.status(400);

        throw new Error(
            "Invalid Or Expired Token"
        );

    }

    user.password =
        await bcrypt.hash(req.body.password, 10);

    user.resetPasswordToken =
        undefined;

    user.resetPasswordExpire =
        undefined;

    await user.save();

    res.status(200).json({

        success: true,

        message:
            "Password Reset Successfully",

    });

});


module.exports = {
    registerUser,
    loginUser,
    getUser,
    adminOnly,
    forgotPassword,
    resetPassword,
};
