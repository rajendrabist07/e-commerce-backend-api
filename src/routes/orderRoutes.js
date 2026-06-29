const express = require("express");
const router = express.Router();

const protect = require(
    "../middleware/authMiddleware"
);

const adminOnly = require("../middleware/adminMiddleware")

const {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus,
} = require(
    "../controllers/orderController"
);
const { route } = require("./cartRoutes");


router.post("/", protect, placeOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/admin", protect, adminOnly, getAllOrders);

router.put("/admin/:id", protect, adminOnly, updateOrderStatus);

router.get("/:id", protect, getSingleOrder);

module.exports = router;