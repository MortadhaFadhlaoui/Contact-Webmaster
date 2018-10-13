// routes/contact.route.js

const express = require("express");
const app = express();
const contactRoutes = express.Router();
const nodemailer = require("nodemailer");

// Configure mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mortadha.fadhlaoui@esprit.tn",
    pass: "mewkhhitdxluqjah"
  }
});

// Config mail sender
const sender = "contact-webmaster@test.fr";

// Require Contact model in our routes module
let Contact = require("../models/Contact");

// Defined store route
contactRoutes.route("/add").post(function(req, res) {
  /* POST contact/add */
  // create a new contact from Request client (json format)
  let contact = new Contact(req.body);

  //save contact object to database
  contact
    .save()
    .then(contact => {
      sendMail(req.body);
      res.status(200).json({ result: "Contact is added successfully" });
    })
    .catch(err => {
      res.status(400).json({ result: "Unable to save to database" });
    });
});

// Send mail function
function sendMail(receiver) {
  const mailOptions = {
    from: "Webmaster <" + sender + ">",
    to: receiver.email,
    subject: "Confirmation of your sending",
    text:
      "Your recently send a message, We will try to answer you as much as possible.\n" +
      "Message content :\n" +
      "Name : " +
      receiver.name +
      "\n" +
      "Email : " +
      receiver.email +
      "\n" +
      "Phone number : " +
      receiver.phone +
      "\n" +
      "Message : " +
      receiver.message +
      "."
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = contactRoutes;
