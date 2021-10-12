const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users-controller');
const userAuth = require("../middleware/check-auth");

router.post('/signup', UserController.signup());
router.post('/login', UserController.login());
router.patch('/update/:id', userAuth, UserController.update());
router.get('/loggedInUser', UserController.loggedInUser());

module.exports = router;