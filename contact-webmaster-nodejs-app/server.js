// server.js

// Import all required packages to work with.
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

// Database connection using promises.
mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{ useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    err => { console.log('Can not connect to the database'+ err)}/** handle initial connection error */
);

const app = express();

// Require Contact routes in our server
const contactRoutes = require('./routes/contact.route');

// Add the middleware libraries into the request handling chain
app.use(bodyParser.json());
app.use(cors());

// Add our route-handling code to the request handling chain
app.use('/contact', contactRoutes);


// Defined environment variable PORT and start listening server connections.
const port = process.env.PORT || 4000;
const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});