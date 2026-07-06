const express = require("express");

const router = express.Router();

const {

    createPayment,

    verifyPayment,

} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

// Create Payment

router.post(

    "/",

    protect,

    createPayment

);

// Verify Payment

router.put(

    "/verify",

    protect,

    verifyPayment


);

module.exports = router;
