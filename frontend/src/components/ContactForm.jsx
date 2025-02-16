import React from "react";
import "./ContactForm.css"; // Import the CSS file

const ContactForm = () => {
  return (
    <div className="body">
      <h1 className="get">Get in Touch</h1>
      <div className="contact-container">
        {/* Form Section */}
   
        <div className="form-section">
          <h2 className="section-title">Send a Message</h2>
          <form>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                className="input-half"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input-half"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="input-full"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Mobile"
                className="input-full"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Write your message here..."
                className="textarea-full"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
