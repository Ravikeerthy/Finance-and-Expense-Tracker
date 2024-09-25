import React from "react";
import "./ContactStyle.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>
      <p className="contact-p">Feel free to reach out to us using the following information:</p>
      <ul>
        <li>
          <strong>Email:</strong> contact@example.com
        </li>
        <li>
          <strong>Phone:</strong> +123 456 7890
        </li>
        <li>
          <strong>Address:</strong> 123 Main Street,   City, State, ZIP
        </li>
      </ul>
    </div>
  );
};

export default ContactUs;
