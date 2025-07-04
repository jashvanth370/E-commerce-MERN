const Subscriber = require('../models/subscriber');

// Subscribe to newsletter
module.exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                return res.status(400).json({ message: "Email already subscribed" });
            } else {
                // Reactivate subscription
                existingSubscriber.isActive = true;
                await existingSubscriber.save();
                return res.status(200).json({
                    message: "Subscription reactivated successfully",
                    subscriber: existingSubscriber
                });
            }
        }

        // Create new subscriber
        const subscriber = new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({
            message: "Subscribed successfully",
            subscriber: subscriber
        });

    } catch (error) {
        console.error("Subscribe Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Unsubscribe from newsletter
module.exports.unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const subscriber = await Subscriber.findOne({ email });
        if (!subscriber) {
            return res.status(404).json({ message: "Subscriber not found" });
        }

        subscriber.isActive = false;
        await subscriber.save();

        res.status(200).json({
            message: "Unsubscribed successfully",
            subscriber: subscriber
        });

    } catch (error) {
        console.error("Unsubscribe Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all active subscribers (admin only)
module.exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({ isActive: true }).sort({ subscribedAt: -1 });

        res.status(200).json({
            message: "Subscribers fetched successfully",
            subscribers: subscribers,
            count: subscribers.length
        });

    } catch (error) {
        console.error("Get Subscribers Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}; 