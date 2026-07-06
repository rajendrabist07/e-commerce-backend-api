const { body } = require("express-validator");

module.exports = [

    body("rating")
        .isFloat({
            min: 1,
            max: 5,
        })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")

];