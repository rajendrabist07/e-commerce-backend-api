const { body } = require("express-validator");

const addToCartValidation = [

    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID"),

    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

];

const updateCartValidation = [

    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

];

module.exports = {

    addToCartValidation,

    updateCartValidation,

};