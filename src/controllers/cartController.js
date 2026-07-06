const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");


// ADD TO CART
const addToCart = asyncHandler(async (req, res) => {

    const { productId, quantity } = req.body;

    let cartItem = await Cart.findOne({
        user: req.user._id,
        product: productId,
    });

    if (cartItem) {

        cartItem.quantity += quantity;

        await cartItem.save();

        return res.status(200).json({
            success: true,
            message: "Cart Quantity Updated",
            data: {
                cartItem,
            },
        });

    }

    cartItem = await Cart.create({

        user: req.user._id,
        product: productId,
        quantity,

    });

    res.status(201).json({
        success: true,
        message: "Product Added To Cart",
        data: {
            cartItem,
        },
    });

});


// GET CART

const getCartItems = asyncHandler(async (req, res) => {

    const cartItems = await Cart.find({
        user: req.user._id,
    }).populate("product");

    res.status(200).json({
        success: true,
        message: "Cart Fetched Successfully",
        data: {
            cartItems,
        },
    });

});



// UPDATE CART
const updateCartQuantity = asyncHandler(async (req, res) => {

    const { quantity } = req.body;

    if (quantity <= 0) {

        res.status(400);

        throw new Error(
            "Quantity must be greater than zero"
        );

    }

    const cartItem = await Cart.findOne({

        _id: req.params.id,
        user: req.user._id,

    });

    if (!cartItem) {

        res.status(404);

        throw new Error(
            "Cart Item Not Found"
        );

    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({

        success: true,

        message: "Cart Updated Successfully",

        data: {

            cartItem,

        },

    });

});


// REMOVE CART ITEM
const removeCartItem = asyncHandler(async (req, res) => {

    const cartItem = await Cart.findOne({

        _id: req.params.id,
        user: req.user._id,

    });

    if (!cartItem) {

        res.status(404);

        throw new Error(
            "Cart Item Not Found"
        );

    }

    await cartItem.deleteOne();

    res.status(200).json({

        success: true,

        message: "Cart Item Removed Successfully",

    });

});


module.exports = {

    addToCart,
    getCartItems,
    updateCartQuantity,
    removeCartItem,

};