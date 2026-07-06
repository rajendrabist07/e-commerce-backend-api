const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },

    discount: {
        type: Number,
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

}, {

    timestamps: true,

});

module.exports = mongoose.model(
    "Coupon",
    couponSchema
);