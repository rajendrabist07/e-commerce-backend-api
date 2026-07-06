const Payment = require("../models/Payment");

// Create Payment
const createPayment = async (paymentData) => {

    return await Payment.create(paymentData);

};

// Get Payment By Order
const getPaymentByOrder = async (orderId) => {

    return await Payment.findOne({

        order: orderId,

    });

};

// Update Payment Status
const updatePaymentStatus = async (

    paymentId,

    status,

    transactionId = ""

) => {

    return await Payment.findByIdAndUpdate(

        paymentId,

        {

            paymentStatus: status,

            transactionId,

        },

        {

            new: true,

        }

    );

};

module.exports = {

    createPayment,

    getPaymentByOrder,

    updatePaymentStatus,

};