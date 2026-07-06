const { body } = require("express-validator");

const productValidation = [

    body("name")
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than 0"),

    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock cannot be negative"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

];

module.exports = productValidation;