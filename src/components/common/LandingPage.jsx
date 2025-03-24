import React from "react";
// import { useRef } from "react";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import "../../assets/landingpage.css";
import landingpage from "../../assets/images/landingpage_image.avif";
import landingpage2 from "../../assets/images/landingpage2.jpg";
// import image from "../../assets/images/image.jpg";
import { Link } from "react-router-dom";
// import { Carousel } from "react-bootstrap";

const LandingPage = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }


  return (
    <div className="hero_area">
      {/* Header Section */}
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <Link className="navbar-brand" to="/">
              <span>Retrotrade</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/exploreitems">
                    Explore Items
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus">
                    About Us
                  </Link>
                </li>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => scrollToSection("contactus")}
                >
                Contact Us
                </a>

                <li className="nav-item">
                  <Link className="nav-link" to="/buyerlogin">
                    Buyer Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sellerlogin">
                    Seller Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="detail_box">
                <h2><strong>Welcome to Retrotrade</strong></h2>
                <p>
                  <strong>Discover a world of second-hand treasures! Whether you're buying or selling, our platform makes it easy to save money and enjoy a seamless, secure shopping experience.</strong>
                </p>
                <div className="btn-box">
                  <Link to="/exploreitems" className="btn-2">
                    Explore Items
                  </Link>
                  <Link to="/signup" className="btn-1">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
              <div className="img-box">
                <img src={landingpage2} alt="About Retrotrade" className="img-fluid" />
              </div>
                {/* <Carousel prevLabel="" nextLabel="">
                  <Carousel.Item>
                    <img
                      src={landingpage2}
                      alt="Retrotrade Slider"
                      className="carousel-image img-fluid"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={image}
                      alt="Retrotrade Slider"
                      className="carousel-image img-fluid"
                    />
                  </Carousel.Item>
                </Carousel> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about_section" id="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={landingpage} alt="About Retrotrade" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Retrotrade</h2>
                </div>
                <p>
                  <strong>At RetroTrade, we believe in creating a sustainable, budget-friendly, and convenient way to buy and sell second-hand goods. Our platform is designed to connect individuals looking to declutter their space with those seeking affordable and high-quality pre-owned items. By fostering a circular economy, we help reduce waste while making second-hand shopping secure, seamless, and trustworthy.</strong>
                </p>
                <Link to="/aboutus" className="btn-2">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features_section">
        <div className="container">
          <div className="heading_container">
            <h2>Why Choose Retrotrade?</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="feature_box">
                <i className="fas fa-gem"></i>
                <h3>Unique Items</h3>
                <p>Discover one-of-a-kind vintage and retro treasures.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature_box">
                <i className="fas fa-shipping-fast"></i>
                <h3>Fast Shipping</h3>
                <p>Get your items delivered quickly and securely.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature_box">
                <i className="fas fa-headset"></i>
                <h3>24/7 Support</h3>
                <p>Our team is always here to assist you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials_section">
        <div className="container">
          <div className="heading_container">
            <h2>What Our Customers Say</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial_box">
                <p>"Retrotrade has the best collection of vintage items. I love their service!"</p>
                <h4>- Jane Doe</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial_box">
                <p>"The quality of the retro items is amazing. Highly recommended!"</p>
                <h4>- John Smith</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial_box">
                <p>"Fast shipping and excellent customer support. Will shop again!"</p>
                <h4>- Emily Brown</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact_section" id="contactus" >
        <div className="container">
          <div className="heading_container">
            <h2>Contact Us</h2>
          </div>
          <p>
            Have questions or need assistance? Feel free to reach out to us. We're here to help!
          </p>
          <div className="contact-info">
            <p>
              <strong>Email:</strong> retro.tradee@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 Retro Lane, Vintage City, VC 12345
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer_section">
        <div className="container">
          <p>&copy; 2023 Retrotrade. All rights reserved.</p>
        </div>         
      </footer>
    </div>
  );
};

export default LandingPage;