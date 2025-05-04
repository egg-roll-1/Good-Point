import React from 'react';
import styles from './Footer.module.css'; // 또는 Link가 필요한 경우 둘 다

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footernav}>
        <NavItem icon="🏠" label="홈" />
        <NavItem icon="🤝" label="봉사활동" />
        <NavItem icon="💰" label="포인트" />
        <NavItem icon="👤" label="내 정보" />
      </nav>
    </footer>
  );
};

const NavItem = ({ icon, label }) => (
  <div className={styles.footeritem}>
    <div className={styles.footericon}>{icon}</div>
    <div className={styles.footerlabel}>{label}</div>
  </div>
);

export default Footer;
