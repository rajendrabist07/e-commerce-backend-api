const Wishlist = require("../models/Wishlist");

// Add Wishlist
const addWishlist = async (userId, productId) => {

    return await Wishlist.create({

        user: userId,

        product: productId,

    });

};

// Get Wishlist
const getWishlist = async (userId) => {

    return await Wishlist.find({

        user: userId,

    }).populate("product");

};

// Remove Wishlist
const removeWishlist = async (id) => {

    return await Wishlist.findByIdAndDelete(id);

};

module.exports = {

    addWishlist,

    getWishlist,

    removeWishlist,

};