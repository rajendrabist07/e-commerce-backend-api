const asyncHandler = require("express-async-handler");

const couponService = require("../services/couponService");

// CREATE COUPON
const createCoupon = asyncHandler(async (req, res) => {

    const coupon = await couponService.createCoupon(req.body);

    res.status(201).json({

        success: true,

        message: "Coupon Created Successfully",

        data: {

            coupon,

        },

    });

});

// APPLY COUPON
const applyCoupon = asyncHandler(async (req, res) => {

    const {

        code,

        totalPrice,

    } = req.body;

    const coupon =
        await couponService.getCouponByCode(code);

    if (!coupon) {

        res.status(404);

        throw new Error("Invalid Coupon");

    }

    if (coupon.expiresAt < new Date()) {

        res.status(400);

        throw new Error("Coupon Expired");

    }

    const discountAmount =
        (totalPrice * coupon.discount) / 100;

    const finalPrice =
        totalPrice - discountAmount;

    res.status(200).json({

        success: true,

        data: {

            coupon,

            discountAmount,

            finalPrice,

        },

    });

});

module.exports = {

    createCoupon,

    applyCoupon,

};