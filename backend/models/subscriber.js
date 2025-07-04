const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    lastEmailSent: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', SubscriberSchema); 