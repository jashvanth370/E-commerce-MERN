const { getAllUsers, updateUser, profile } = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploads');

const router = require('express').Router();

router.get('/getAllUsers', getAllUsers);
router.put('/updateUser', authMiddleware, upload.single('profilePic'), updateUser);
router.get('/profile', authMiddleware, profile);

module.exports = router;