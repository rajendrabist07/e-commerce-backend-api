const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const {
    getDashboardStats,
    getRecentOrders,
    getLowStockProducts,
    getTopProducts,
    getMonthlySales,

} = require("../controllers/dashboardController");

router.get(
    "/stats",
    protect,
    authorizeAdmin,
    getDashboardStats
);

router.get(
    "/recent-orders",
    protect,
    authorizeAdmin,
    getRecentOrders
);

router.get(
    "/low-stock",
    protect,
    authorizeAdmin,
    getLowStockProducts
);

router.get(
    "/top-products",
    protect,
    authorizeAdmin,
    getTopProducts
);

router.get(
    "/monthly-sales",
    protect,
    authorizeAdmin,
    getMonthlySales
);

module.exports = router;
