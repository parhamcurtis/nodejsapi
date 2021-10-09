const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users-controller');

router.post('/signup', UserController.signup());
router.post('/login', UserController.login());
router.patch('/update/:id', UserController.update());
router.get('/loggedInUser', UserController.loggedInUser());

module.exports = router;