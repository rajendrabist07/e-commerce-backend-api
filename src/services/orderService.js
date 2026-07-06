const Order = require("../models/Order");

// Create Order
const createOrder = async (orderData) => {

    return await Order.create(orderData);

};

// Get Order By Id
const getOrderById = async (id) => {

    return await Order.findById(id);

};

// Get My Orders
const getMyOrders = async (userId) => {

    return await Order.find({
        user: userId,
    }).populate("orderItems.product");

};

// Get All Orders
const getAllOrders = async () => {

    return await Order.find()
        .populate("user", "name email")
        .populate("orderItems.product", "name price");

};

// Update Order Status
const updateOrderStatus = async (id, status) => {

    return await Order.findByIdAndUpdate(

        id,

        {
            orderStatus: status,
        },

        {
            new: true,
            runValidators: true,
        }

    );

};

module.exports = {

    createOrder,
    getOrderById,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,

};