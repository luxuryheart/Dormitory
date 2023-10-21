const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const dbConnect = require('./config/db')

const app = express();

const port = process.env.PORT || 3000;

// Midleware 
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Connect to Database
dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log('Server running on port: ' + port);
        })
    })
    .catch((err) => console.log(err))

// Import router
const userRoute = require('./routes/user/user')

// Use Route
app.use(userRoute);
