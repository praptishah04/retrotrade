import React from 'react';
import '../../assets/landing/aboutus.css'; // CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About RetroTrade</h1>
        <p className="tagline">Reviving the Past, Building a Sustainable Future</p>
      </div>

      <div className="about-us-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At RetroTrade, we believe in giving pre-loved items a second life. Our mission is to create a seamless and secure platform where individuals can buy and sell second-hand goods, fostering a sustainable economy and reducing waste. By connecting buyers and sellers, we aim to make second-hand shopping easy, affordable, and environmentally friendly.
          </p>
        </section>

        <section className="features-section">
          <h2>Why Choose RetroTrade?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🌱</div>
              <h3>Sustainable Shopping</h3>
              <p>Join us in reducing waste and promoting a circular economy by buying and selling second-hand items.</p>
            </div>
            <div className="feature-card">
              <div className="icon">💸</div>
              <h3>Budget-Friendly</h3>
              <p>Find affordable alternatives to new products and save money while shopping for quality pre-owned items.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🔒</div>
              <h3>Secure Transactions</h3>
              <p>Our integrated payment gateway ensures safe and secure transactions, with escrow protection for added peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🌟</div>
              <h3>Community Trust</h3>
              <p>Build trust through our rating and review system, ensuring a reliable and transparent marketplace for all users.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet the Team</h2>
          <p>
            Behind RetroTrade is a passionate team of developers, designers, and sustainability advocates dedicated to creating a platform that makes second-hand shopping accessible and enjoyable for everyone. We're committed to building a community that values sustainability, affordability, and trust.
          </p>
        </section>

        <section className="future-section">
          <h2>Our Vision for the Future</h2>
          <p>
            We're constantly working to improve RetroTrade and bring you new features. In the future, we plan to introduce AI-powered product recommendations, live auctions, and even a mobile app to make second-hand shopping more convenient than ever. Together, we can build a more sustainable world, one pre-loved item at a time.
          </p>
        </section>
      </div>

      <div className="about-us-footer">
        <p>Join us today and be part of the RetroTrade community!</p>
        <button className="join-button">Get Started</button>
      </div>
    </div>
  );
};

export default AboutUs;