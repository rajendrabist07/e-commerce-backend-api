const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],

        shippingAddress: {
            address: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            postalCode: {
                type: String,
                required: true,
            },

            country: {
                type: String,
                required: true,
            },
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: Date,

        isDelivered: {
            type: Boolean,
            default: false,
        },

        deliveredAt: Date,
    },


    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);