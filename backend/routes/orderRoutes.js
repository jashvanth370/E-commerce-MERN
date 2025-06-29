const { createOrder, getOrdersById, getAllOrders } = require('../controller/OrderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/createOrder',authMiddleware, createOrder);
router.get('/getAllOrders',authMiddleware,getAllOrders)
router.get('/getOrdersByUserId',authMiddleware, getOrdersById);

module.exports = router;