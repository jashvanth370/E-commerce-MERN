// models/Order.js
const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    product:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    qty:
    {
        type: Number,
        required: true
    },
})

const orderSchema = new mongoose.Schema({

    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    orderItems: [
        orderItemsSchema
    ],
    shippingAddress:
    {
        type: String,
        required: true
    },
    paymentMethod:
    {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt:
    {
        type: Date
    },
    isDelivered:
    {
        type: Boolean,
        default: false
    },
    deliveredAt:
    {
        type: Date
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
