const express = require('express');
const app = express();
const router = express.Router();
const contactRoutes = require('./api/routes/contacts');
const todoRoutes = require('./api/routes/todos');
const userRoutes = require('./api/routes/users');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userAuth = require('./api/middleware/check-auth');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS error handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//Routes 
app.use('/contacts', userAuth, contactRoutes);
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

//Error Handling
app.use((req, res, next) => {
    const error = new Error("Route not found.");
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;