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


// ADD ITEM
router.post(
    "/",
    protect,
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
    updateCartQuantity
)

module.exports = router;