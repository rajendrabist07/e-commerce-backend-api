const { body } = require("express-validator");

const registerValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")

];

const loginValidator = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

];

const forgotPasswordValidation = [

    body("email")
        .trim()

        .isEmail()

        .withMessage(
            "Valid Email Required"
        ),

];

const resetPasswordValidation = [

    body("password")

        .isLength({

            min: 6,

        })

        .withMessage(
            "Password Minimum 6 Characters"
        ),

];

module.exports = {
    registerValidator,
    loginValidator,
    forgotPasswordValidation,
    resetPasswordValidation,

};
