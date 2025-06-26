const { createProduct } = require('../controller/ProductController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/create',authMiddleware, createProduct);

module.exports = router;