const express = require('express');
const router = express.Router();
const userController = require('../../controller/user/userController')

// Role
router.post('/role', userController.addRole);

// User
router.post('/signup', userController.Signup);
router.post('/signin', userController.Login);

module.exports = router;