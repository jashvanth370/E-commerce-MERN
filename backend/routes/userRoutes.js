const { getAllUsers } = require('../controller/UserController');

const router = require('express').Router();

router.get('/getAllUsers',getAllUsers);

module.exports = router;