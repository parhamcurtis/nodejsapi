const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todos-controller');
const userAuth = require('../middleware/check-auth');

router.get('/', userAuth, TodosController.getAll());

router.post('/', userAuth, TodosController.create());

router.get('/:id', userAuth, TodosController.findById());

router.patch('/:id', userAuth, TodosController.update());

router.delete('/:id', userAuth, TodosController.delete());

module.exports = router;