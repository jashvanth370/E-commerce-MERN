const { createOrder } = require('../controller/OrderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/createOrder',authMiddleware, createOrder);

module.exports = router;