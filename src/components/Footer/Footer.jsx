// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <NavItem icon="🏠" label="홈" />
        <NavItem icon="🤝" label="봉사활동" />
        <NavItem icon="💰" label="포인트" />
        <NavItem icon="👤" label="내 정보" />
      </nav>
    </footer>
  );
};

const NavItem = ({ icon, label }) => (
  <div className="footer-item">
    <div className="footer-icon">{icon}</div>
    <div className="footer-label">{label}</div>
  </div>
);

export default Footer;
