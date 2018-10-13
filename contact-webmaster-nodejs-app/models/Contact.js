// models/Contact.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Contact
let Contact = new Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
},{
    collection: 'contacts'
});

module.exports = mongoose.model('Contact', Contact);