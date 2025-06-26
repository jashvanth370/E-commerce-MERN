const Order = require("../models/order");

module.exports.createOrder = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }
        
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json({orderDetails : createdOrder, message: "Order successfully created" , success: true});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}