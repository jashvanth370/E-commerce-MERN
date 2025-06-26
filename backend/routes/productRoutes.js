const { createProduct, getAllProducts, getProductsByUser } = require('../controller/ProductController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/create',authMiddleware, createProduct);
router.get('/getAllProducts',getAllProducts);
router.get('/getProductsByUser',authMiddleware, getProductsByUser);

module.exports = router;