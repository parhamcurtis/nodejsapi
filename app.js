const express = require('express');
const app = express();
const router = express.Router();
const contactRoutes = require('./api/routes/contacts');
const todoRoutes = require('./api/routes/todos');
const userRoutes = require('./api/routes/users');

//Routes 
app.use('/contacts', contactRoutes);
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

module.exports = app;