// Paths 
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

// Dotenv Config
dotenv.config();

// App 
const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Imports 
const sequelize = require('./database/db');
const MainRouter = require('./routes');

// Middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger('dev'));

// Database Creating
// const init = async () => {
//     sequelize.authenticate();
//     sequelize.sync( { alter: true } );
// }
// init();

// Api
app.use('/api', MainRouter);

// App Listen
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT} port`);
});