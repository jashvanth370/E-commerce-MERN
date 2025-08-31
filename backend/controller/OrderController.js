const Order = require("../models/order");

module.exports.createOrder = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required' });
        }

        if (!paymentMethod) {
            return res.status(400).json({ message: 'Payment method is required' });
        }

        if (!totalPrice || totalPrice <= 0) {
            return res.status(400).json({ message: 'Valid total price is required' });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            orderStatus: 'pending'
        });

        const createdOrder = await order.save();
        res.status(201).json({
            orderDetails: createdOrder,
            message: "Order successfully created",
            success: true
        });
    } catch (err) {
        console.error('Create order error:', err);
        res.status(500).json({ message: err.message });
    }
}

module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('orderItems.product', 'title price image');
        if (!orders || orders.length === 0) {
            return res.status(200).json({ message: "No orders found" });
        }
        res.status(200).json({ orderDetails: orders, message: "Orders successfully fetched", success: true });

    } catch (err) {
        console.error('Get all orders error:', err);
        res.status(500).json({ message: err.message });
    }
}

module.exports.getOrdersById = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const orders = await Order.find({ user: userId })
            .populate('orderItems.product', 'title price image')
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(200).json({ message: "No orders for this user" });
        }
        res.status(200).json({ orderDetails: orders, message: "Orders successfully fetched", success: true });

    } catch (error) {
        console.error("Failed to fetch orders by user:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        if (!orderStatus || !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(orderStatus)) {
            return res.status(400).json({ message: 'Valid order status is required' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = orderStatus;
        if (orderStatus === 'delivered') {
            order.isDelivered = true;
            order.deliveredAt = new Date();
        }

        const updatedOrder = await order.save();
        res.status(200).json({
            orderDetails: updatedOrder,
            message: "Order status updated successfully",
            success: true
        });

    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: error.message });
    }
}