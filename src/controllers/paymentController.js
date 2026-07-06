const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService");

// CREATE PAYMENT
const createPayment = asyncHandler(async (req, res) => {

    const {

        orderId,
        paymentMethod,

    } = req.body;

    const order =
        await orderService.getOrderById(orderId);

    if (!order) {

        res.status(404);

        throw new Error("Order Not Found");

    }

    const payment =
        await paymentService.createPayment({

            user: req.user._id,

            order: order._id,

            paymentMethod,

            amount: order.totalPrice,

        });

    res.status(201).json({

        success: true,

        message: "Payment Created",

        data: {

            payment,

        },

    });

});

// VERIFY PAYMENT
const verifyPayment = asyncHandler(async (req, res) => {

    const {

        paymentId,

        orderId,

        transactionId,

        paymentStatus,

    } = req.body;

    const payment =
        await paymentService.updatePaymentStatus(

            paymentId,

            paymentStatus,

            transactionId

        );

    if (!payment) {

        res.status(404);

        throw new Error("Payment Not Found");

    }

    if (paymentStatus === "Paid") {

        const order = await Order.findById(orderId || payment.order);

        if (!order) {

            res.status(404);

            throw new Error("Order Not Found");

        }

        order.paymentStatus = "Paid";

        order.isPaid = true;

        order.transactionId = transactionId;

        order.paidAt = new Date();

        await order.save();

    }

    res.status(200).json({

        success: true,

        message: "Payment Updated",

        data: {

            payment,

        },

    });

});

module.exports = {

    createPayment,

    verifyPayment,
};
