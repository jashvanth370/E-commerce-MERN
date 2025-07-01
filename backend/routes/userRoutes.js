const { getAllUsers, updateUser, getUserById } = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/getAllUsers',getAllUsers);
router.put('/updateUser',authMiddleware,updateUser);
router.get('/profile',authMiddleware, getUserById);

module.exports = router;