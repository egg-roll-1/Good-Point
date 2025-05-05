// src/components/MenuGrid.jsx
import React from 'react';
import styles from './MenuGrid.module.css';

const menuItems = [
  { icon: '', label: '지역봉사' },
  { icon: '', label: '봉사내역' },
  { icon: '', label: '이용정보' },
  { icon: '', label: '마이페이지' },
  { icon: '', label: '포인트조회' },
  { icon: '', label: '자주묻는질문' },
];

const MenuGrid = () => {
  return (
    <div className={styles.menugridwrapper}>
      <div className={styles.menurow}>
        {menuItems.slice(0, 4).map((item, index) => (
          <div key={index} className={styles.menuitem}>
            <div className={styles.menuicon}>{item.icon}</div>
            <div className={styles.menulabel}>{item.label}</div>
          </div>
        ))}
      </div>
      <div className={`${styles.menurow} ${styles.centerrow}`}>
        {menuItems.slice(4).map((item, index) => (
          <div key={index} className={styles.menuitem}>
            <div className={styles.menuicon}>{item.icon}</div>
            <div className={styles.menulabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
