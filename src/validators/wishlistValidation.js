const { body } = require("express-validator");

module.exports = [

    body("productId")
        .notEmpty()
        .withMessage("Product Id is Required")

];