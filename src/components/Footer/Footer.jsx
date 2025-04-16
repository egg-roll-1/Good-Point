import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <NavItem icon="🏠" label="홈" to="/" />
        <NavItem icon="🤝" label="봉사활동" to="/volunteer" />
        <NavItem icon="💰" label="포인트" to="/point" />
        <NavItem icon="👤" label="내 정보" to="/myinfo" />
      </nav>
    </footer>
  );
};

const NavItem = ({ icon, label, to }) => (
  <Link to={to} className="footer-item">
    <div className="footer-icon">{icon}</div>
    <div className="footer-label">{label}</div>
  </Link>
);

export default Footer;
