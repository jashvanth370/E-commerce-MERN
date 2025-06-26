const { SingUp, Login } = require("../controller/AuthController");
const router = require('express').Router();
const upload = require('../middleware/uploads')


router.post('/register',  upload.single('profilePic'), SingUp);
router.post('/login',Login)

module.exports = router;