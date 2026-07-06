const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
        (acc, order) => acc + order.totalPrice,
        0
    );

    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue,
        },
    });

});

const getRecentOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(10);

    res.status(200).json({
        success: true,
        data: {
            orders,
        },
    });

});

const getLowStockProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({
        stock: {
            $lte: 5,
        },
    });

    res.status(200).json({
        success: true,
        count: products.length,
        data: {
            products,
        },
    });

});

const getTopProducts = asyncHandler(async (req, res) => {

    const products = await Product.find()
        .sort({
            sold: -1,
        })
        .limit(10);

    res.status(200).json({
        success: true,
        data: {
            products,
        },
    });

});

const getMonthlySales = asyncHandler(async (req, res) => {

    const sales = await Order.aggregate([

        {

            $group: {

                _id: {

                    month: {

                        $month: "$createdAt",

                    },

                    year: {

                        $year: "$createdAt",

                    },

                },

                totalRevenue: {

                    $sum: "$totalPrice",

                },

                totalOrders: {

                    $sum: 1,

                },

            },

        },

        {

            $sort: {

                "_id.year": 1,

                "_id.month": 1,

            },

        },

    ]);

    res.status(200).json({

        success: true,

        data: {

            sales,

        },

    });

});

module.exports = {
    getDashboardStats,
    getRecentOrders,
    getLowStockProducts,
    getTopProducts,
    getMonthlySales,
};
