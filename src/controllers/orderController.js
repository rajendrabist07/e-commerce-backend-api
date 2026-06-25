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
            order,
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
            orders,
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
      order,
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
};