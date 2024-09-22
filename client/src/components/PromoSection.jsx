import React from 'react';
import '../styles/promoSection.css';

const PromoSection = () => {
  return (
    <div className="promo-section">
      <div className="promo-content">
        <h2 className="promo-title">Limited Time Offer!</h2>
        <p className="promo-text">
          Enjoy a <span className="highlight">15% Discount</span> on all orders above ₹2500!
        </p>
      </div>
    </div>
  );
};

export default PromoSection;
