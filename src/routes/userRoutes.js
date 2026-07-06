const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "User Route Working",
    });
});

const {
    registerUser,
    loginUser,
    getUser,
    forgotPassword,
    resetPassword,
} = require("../controllers/userController");


const protect = require("../middleware/authMiddleware")

const validate = require("../middleware/validationMiddleware");

const {
    registerValidator,
    loginValidator,
    forgotPasswordValidation,
    resetPasswordValidation,
} = require("../validators/authValidator")

router.post("/register",
    registerValidator,
    validate,
    registerUser,
);

// Forgot Password

router.post(

    "/forgot-password",
    forgotPasswordValidation,
    validate,
    forgotPassword

);

// Reset Password

router.put(

    "/reset-password/:token",
    resetPasswordValidation,
    validate,
    resetPassword

);


router.post(
    "/login",
    loginValidator,
    validate,
    loginUser
);

router.get("/profile",
    protect,
    getUser
);


module.exports = router;
