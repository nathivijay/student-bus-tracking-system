import React from "react";

import { Phone, Mail } from "lucide-react";

const ReportIssue = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="contact-Section">
        <div className="contact-container">
          <h2 className="contact-heading">Report Issue</h2>
          <div className="contact-grid-container">
            <div className="details-space">
              <div className="details-flex-container">
                <Phone className="details-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="details-flex-container">
                <Mail className="details-icon" />
                <div>
                  <h3>Email</h3>
                  <p>support@campuscommute.com</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <input
                type="text"
                placeholder="Name"
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                className="form-input"
              />
              <textarea
                placeholder="Message"
                className="form-input"
              ></textarea>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReportIssue;
