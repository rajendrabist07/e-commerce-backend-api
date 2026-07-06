const asyncHandler = require("express-async-handler");
const wishlistService = require("../services/wishlistService");

// ADD TO WISHLIST
const addWishlist = asyncHandler(async (req, res) => {

    const { productId } = req.body;

    const wishlist =
        await wishlistService.addWishlist(
            req.user._id,
            productId
        );

    res.status(201).json({

        success: true,

        message: "Product Added To Wishlist",

        data: {
            wishlist,
        },

    });

});

// GET MY WISHLIST
const getWishlist = asyncHandler(async (req, res) => {

    const wishlist =
        await wishlistService.getWishlist(
            req.user._id
        );

    res.status(200).json({

        success: true,

        count: wishlist.length,

        data: {
            wishlist,
        },

    });

});

// REMOVE WISHLIST
const removeWishlist = asyncHandler(async (req, res) => {

    const wishlist =
        await wishlistService.removeWishlist(
            req.params.id
        );

    if (!wishlist) {

        res.status(404);

        throw new Error("Wishlist Item Not Found");

    }

    res.status(200).json({

        success: true,

        message: "Wishlist Removed",

    });

});

module.exports = {

    addWishlist,
    getWishlist,
    removeWishlist,

};