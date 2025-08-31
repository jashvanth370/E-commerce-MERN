const { subscribe, unsubscribe, getAllSubscribers } = require('../controller/SubscriberController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes (protected)
router.get('/all', authMiddleware, getAllSubscribers);

module.exports = router; 