const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const wishlistValidation =
    require("../validators/wishlistValidation");

const {

    addWishlist,

    getWishlist,

    removeWishlist,

} = require("../controllers/wishlistController");

// GET MY WISHLIST
router.get(
    "/",
    protect,
    getWishlist
);

// ADD
router.post(
    "/",
    protect,
    wishlistValidation,
    validate,
    addWishlist
);

// REMOVE
router.delete(
    "/:id",
    protect,
    removeWishlist
);

module.exports = router;
