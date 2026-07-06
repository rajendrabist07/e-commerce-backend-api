const Coupon = require("../models/Coupon");

// Create Coupon
const createCoupon = async (couponData) => {

    return await Coupon.create(couponData);

};

// Get Coupon By Code
const getCouponByCode = async (code) => {

    return await Coupon.findOne({

        code: code.toUpperCase(),

        isActive: true,

    });

};

module.exports = {

    createCoupon,

    getCouponByCode,

};