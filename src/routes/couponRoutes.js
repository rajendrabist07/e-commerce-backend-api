const express = require("express");

const router = express.Router();

const {

    createCoupon,

    applyCoupon,

} = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Admin
router.post(
    "/",
    protect,
    authorizeAdmin,
    createCoupon
);

// User
router.post(
    "/apply",
    protect,
    applyCoupon
);

module.exports = router;