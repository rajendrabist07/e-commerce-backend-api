const Cart = require("../models/Cart");


// ADD TO CART
const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        const cartItem = await Cart.create({
            user: req.user._id,
            product: productId,
            quantity,
        });

        res.status(201).json({
            success: true,
            message: "Product Added To Cart",
            cartItem,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// GET CART ITEMS
const getCartItems = async (req, res) => {
    try {

        const cartItems = await Cart.find({
            user: req.user._id,
        }).populate("product");

        res.status(200).json({
            success: true,
            cartItems,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// REMOVE CART ITEM
const removeCartItem = async (req, res) => {
    try {

        const cartItem =
            await Cart.findById(
                req.params.id
            );

        if (!cartItem) {

            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found",
            });

        }

        await cartItem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Item Removed",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// UPDATE CART QUANTITY

const updateCartQuantity = async (req, res) => {
    try {

        const { quantity } = req.body;

        const cartItem = await Cart.findById(
            req.params.id
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found",
            });
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            success: true,
            message: "Quantity Updated",
            cartItem,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


module.exports = {
    addToCart,
    getCartItems,
    removeCartItem,
    updateCartQuantity,
};