const { data } = require("react-router-dom");
const Order = require("../models/Order");

const placeOrder = async (req, res) => {
    try {

        const {
            orderItems,
            shippingAddress,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            user: req.user._id,
            orderItems,
            shippingAddress,
            totalPrice,
        });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            data: {
                order,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// GET MY ORDERS

const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user._id,
        })
            .populate("orderItems.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            data: {
                orders,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getSingleOrder = async (req, res) => {
    try {

        const order =
            await Order.findById(
                req.params.id
            )
                .populate("user")
                .populate("orderItems.product");

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });

        }

        res.status(200).json({
            success: true,
            data: {
                order,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ADMIN - GET ALL ORDERS
const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("orderItems.product", "name price");

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            data: {
                orders,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Update Order
const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });

        }

        order.orderStatus = req.body.orderStatus;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order Status Updated",
            data: {
                order,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus,
};