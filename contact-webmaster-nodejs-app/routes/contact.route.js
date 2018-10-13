// routes/contact.route.js

const express = require('express');
const app = express();
const contactRoutes = express.Router();

// Require Contact model in our routes module
let Contact = require('../models/Contact');

// Defined store route
contactRoutes.route('/add').post(function (req, res) {/* POST contact/add */
    // create a new contact from Request client (json format)
    let contact = new Contact(req.body);

    //save contact object to database
    contact.save()
        .then(contact => {
            res.status(200).json({'result': 'Contact in added successfully'});
        })
        .catch(err => {
            res.status(400).json({'result': 'Unable to save to database'});
        });
});


module.exports = contactRoutes;