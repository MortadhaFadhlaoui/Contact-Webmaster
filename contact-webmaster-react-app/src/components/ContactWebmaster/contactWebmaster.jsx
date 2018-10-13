/// componentes/ContactWebmaster/contactWebmaster.jsx
import React, { Component } from "react";
import "./contactWebmaster.css";
import axios from "axios";
import Notifications, { notify } from "react-notify-toast";

// Define a class Contact
class Contact extends Component {
  //Define constructor of the class
  constructor(props) {
    super(props);

    this.state = {
      // Define fields of Contact form
      fields: {
        name: "",
        email: "",
        phone: "",
        message: ""
      },
      errors: {}
    };

    //bind functions to this component  handle events
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle form submission
  handleSubmit(event) {
    event.preventDefault();
    let fields = this.state.fields;
    if (this.handleValidation(null, true)) {
      /*validate form submissions */
      this.addContactService(fields);
      this.setState({
        fields: {
          name: "",
          email: "",
          phone: "",
          message: ""
        }
      });
    }
  }

  // Handle input validation
  handleValidation(field, submit) {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    //validate name
    if (field === "name" || submit === true) {
      if (!fields["name"]) {
        /* name vide */
        formIsValid = false;
        errors["name"] = "Please enter your name";
      } else if (typeof fields["name"] !== "undefined") {
        /* name invide */
        if (!fields["name"].match(/^[a-zA-Z ]+$/)) {
          formIsValid = false;
          errors["name"] = "Please enter Only letters";
        }
      }
    }
    //validate email
    if (field === "email" || submit === true) {
      if (!fields["email"]) {
        /* email vide */
        formIsValid = false;
        errors["email"] = "Please enter your email address";
      } else if (typeof fields["email"] !== "undefined") {
        /* email invalide */
        let lastAtPos = fields["email"].lastIndexOf("@");
        let lastDotPos = fields["email"].lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            fields["email"].indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            fields["email"].length - lastDotPos > 2
          )
        ) {
          formIsValid = false;
          errors["email"] = "Please enter a valid email";
        }
      }
    }
    //validate phone
    if (field === "phone" || submit === true) {
      if (!fields["phone"]) {
        /* phone vide */
        formIsValid = false;
        errors["phone"] = "Please enter phone number";
      }
    }
    //validate message
    if (field === "message" || submit === true) {
      if (!fields["message"]) {
        /* message vide */
        formIsValid = false;
        errors["message"] = "Please enter your message";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  // Handle form changes
  handleChange(field, event) {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ fields });
    this.handleValidation(field, false); /*validate input change */
  }

  // Add contact via  HTTP request using axios
  addContactService(contact) {
    axios
      .post("http://localhost:4000/contact/add", contact) /*POST */
      .then(function(response) {
        if (response.status === 200) {
          /*handle success response */
          notify.show("Your message has been sent!", "success");
        } else {
          /*handle other response */
          notify.show("Something Wrong!", "error");
        }
      })
      .catch(function(error) {
        /*handle error response */
        notify.show("Something Wrong!", "error");
      });
  }

  render() {
    return (
      <div className="container-contact100">
        <div className="contact100-map" />
        <div className="wrap-contact100">
          <form
            ref="form"
            className="contact100-form validate-form"
            onSubmit={this.handleSubmit}
          >
            <span className="contact100-form-title">Contact Us</span>

            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Full Name"
                value={this.state.fields["name"]}
                onChange={this.handleChange.bind(this, "name")}
              />
              <span className="focus-input100" />
            </div>
            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.fields["email"]}
                onChange={this.handleChange.bind(this, "email")}
              />
              <span className="focus-input100" />
            </div>
            <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>
            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={this.state.fields["phone"]}
                onChange={this.handleChange.bind(this, "phone")}
              />
              <span className="focus-input100" />
            </div>

            <span style={{ color: "red" }}>{this.state.errors["message"]}</span>
            <div className="wrap-input100">
              <textarea
                className="input100"
                name="message"
                placeholder="Your Message"
                value={this.state.fields["message"]}
                onChange={this.handleChange.bind(this, "message")}
              />
              <span className="focus-input100" />
            </div>

            <div className="container-contact100-form-btn">
              <button type="submit" className="contact100-form-btn">
                Send Email
              </button>
            </div>
            <div className="main">
              <Notifications />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
