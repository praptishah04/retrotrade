import React from 'react';
import '../../assets/landing/contactus.css'; // Import the CSS file for styling

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      {/* Header Section */}
      <div className="contact-us-header">
        <h1>Contact RetroTrade</h1>
        <p>We'd love to hear from you! Reach out to us for any inquiries, feedback, or collaborations.</p>
      </div>

      {/* Main Content */}
      <div className="contact-us-content">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Enter the subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Our Information</h2>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>123 Retro Street, Vintage City, VC 12345</p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <p>+1 (234) 567-8900</p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>info@retrotrade.com</p>
          </div>

          {/* Social Media Links */}
          <div className="social-media">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <a href="https://facebook.com/retrotrade" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/retrotrade" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/retrotrade" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/retrotrade" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Map */}
      <div className="map-container">
        <iframe
          title="RetroTrade Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117462.516392887!2d72.41619999999999!3d23.039537599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1699280000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;