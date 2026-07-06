const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

    },

    order: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Order",

        required: true,

    },

    paymentMethod: {

        type: String,

        enum: [

            "COD",
            "STRIPE",
            "ESEWA",
            "KHALTI"

        ],

        required: true,

    },

    transactionId: {

        type: String,

        default: "",

    },

    amount: {

        type: Number,

        required: true,

    },

    paymentStatus: {

        type: String,

        enum: [

            "Pending",
            "Paid",
            "Failed",
            "Refunded"

        ],

        default: "Pending",

    },

}, {

    timestamps: true,

});

module.exports = mongoose.model(
    "Payment",
    paymentSchema
);