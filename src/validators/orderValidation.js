const { body } = require("express-validator");

const placeOrderValidation = [

    body("orderItems")
        .isArray({ min: 1 })
        .withMessage("Order must contain at least one product"),

    body("shippingAddress")
        .notEmpty()
        .withMessage("Shipping address is required"),

    body("shippingAddress.address")
        .notEmpty()
        .withMessage("Address is required"),

    body("shippingAddress.city")
        .notEmpty()
        .withMessage("City is required"),

    body("shippingAddress.postalCode")
        .notEmpty()
        .withMessage("Postal Code is required"),

    body("shippingAddress.country")
        .notEmpty()
        .withMessage("Country is required"),

    body("totalPrice")
        .isFloat({ min: 0 })
        .withMessage("Total Price must be greater than 0"),

];

const updateOrderStatusValidation = [

    body("orderStatus")
        .notEmpty()
        .withMessage("Order Status is required")
        .isIn([
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ])
        .withMessage("Invalid Order Status"),

];

module.exports = {

    placeOrderValidation,

    updateOrderStatusValidation,

};