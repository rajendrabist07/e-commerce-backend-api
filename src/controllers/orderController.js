const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const productService = require("../services/productService");
const orderService = require("../services/orderService");


const placeOrder = asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        totalPrice,
        paymentMethod,
    } = req.body;

    // Empty Order Check
    if (!orderItems || orderItems.length === 0) {

        res.status(400);

        throw new Error("No Order Items");

    }

    // Check Stock & Update Stock
    for (const item of orderItems) {

        await productService.updateProductStock(

            item.product,

            item.quantity

        );

    }

    // Create Order
    const order = await Order.create({

        user: req.user._id,

        orderItems,

        shippingAddress,

        totalPrice,

        paymentMethod,

    });

    res.status(201).json({

        success: true,

        message: "Order Placed Successfully",

        data: {

            order,

        },

    });

});

// GET MY ORDERS

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        user: req.user._id,
    }).populate("orderItems.product");

    res.status(200).json({
        success: true,
        message: "Orders Fetched Successfully",
        count: orders.length,
        data: {
            orders,
        },
    });

});

const getSingleOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
        .populate("user")
        .populate("orderItems.product");

    if (!order) {

        res.status(404);

        throw new Error("Order Not Found");

    }

    res.status(200).json({
        success: true,
        message: "Order Fetched Successfully",
        data: {
            order,
        },
    });

});

// Get Order By Id

const getOrderById = async (id) => {

    return await Order.findById(id);

};


// ADMIN - GET ALL ORDERS
const getAllOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate("user", "name email")
        .populate("orderItems.product", "name price");

    res.status(200).json({
        success: true,
        message: "All Orders Fetched Successfully",
        totalOrders: orders.length,
        data: {
            orders,
        },
    });

});

// Update Order
const updateOrderStatus = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {

        res.status(404);

        throw new Error("Order Not Found");

    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order Status Updated Successfully",
        data: {
            order,
        },
    });

});

module.exports = {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};