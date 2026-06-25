const express = require("express");
const router = express.Router();

const protect = require(
    "../middleware/authMiddleware"
);

const {
    placeOrder,
    getMyOrders,
    getSingleOrder
} = require(
    "../controllers/orderController"
);
const { route } = require("./cartRoutes");

router.post(
    "/",
    protect,
    placeOrder,
);

router.get(
    "/my-orders",
    protect,
    getMyOrders
);

router.get(
    "/:id",
    protect,
    getSingleOrder
);


module.exports = router;