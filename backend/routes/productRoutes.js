const { createProduct, getAllProducts, getProductsByUser } = require('../controller/ProductController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploads');
const router = require('express').Router();

router.post('/create',upload.single('image'),authMiddleware, createProduct);
router.get('/getAllProducts',getAllProducts);
router.get('/getProductsByUser',authMiddleware, getProductsByUser);

module.exports = router;