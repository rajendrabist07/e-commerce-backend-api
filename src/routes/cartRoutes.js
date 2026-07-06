const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const {
    addToCart,
    getCartItems,
    removeCartItem,
    updateCartQuantity,
} = require(
    "../controllers/cartController"
);

const {
    addToCartValidation,
    updateCartValidation,
} = require("../validators/cartValidation");

const validate = require("../middleware/validationMiddleware");


// ADD ITEM
router.post(
    "/",
    protect,
    addToCartValidation,
    validate,
    addToCart
);


// GET ITEMS
router.get(
    "/",
    protect,
    getCartItems
);


// DELETE ITEM
router.delete(
    "/:id",
    protect,
    removeCartItem
);

// Update Item
router.put(
    "/:id",
    protect,
    updateCartValidation,
    validate,
    updateCartQuantity
)

module.exports = router;
