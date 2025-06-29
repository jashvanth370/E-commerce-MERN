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
        res.status(201).json({ orderDetails: createdOrder, message: "Order successfully created", success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders || orders.length === 0) {
            return res.status(200).json({ message: "No orders " });
        }
        res.status(201).json({ orderDetails: orders, message: "Order successfully fetched", success: true });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getOrdersById = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ message: " User Not Found" });
        }

        const orders = await Order.find({user: userId});
        if (!orders || orders.length === 0) {
            return res.status(200).json({ message: "No orders for this user" });
        }
        res.status(201).json({ orderDetails: orders, message: "Order successfully fetched", success: true });

    } catch (error) {
        console.error("failed to fetch orders by user:", error);
        res.status(500).json({ message: "Server Error" });
    }
}