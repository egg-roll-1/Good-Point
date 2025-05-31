// src/components/MenuGrid.jsx
import React from 'react';
import styles from './MenuGrid.module.css';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: '', label: '지역봉사', to: '/volmap' },
  { icon: '', label: '봉사내역', to: '/history' },
  { icon: '', label: '이용정보', to: '/info' },
  { icon: '', label: '마이페이지', to: '/myinfo' },
  { icon: '', label: '포인트조회', to: '/point' },
  { icon: '', label: '자주묻는질문', to: '/faq' },
];

const MenuGrid = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.menugridwrapper}>
      <div className={styles.menurow}>
        {menuItems.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className={styles.menuitem}
            onClick={() => navigate(item.to)}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label={item.label}
          >
            <div className={styles.menuicon}>{item.icon}</div>
            <div className={styles.menulabel}>{item.label}</div>
          </div>
        ))}
      </div>
      <div className={`${styles.menurow} ${styles.centerrow}`}>
        {menuItems.slice(4).map((item, index) => (
          <div
            key={index}
            className={styles.menuitem}
            onClick={() => navigate(item.to)}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label={item.label}
          >
            <div className={styles.menuicon}>{item.icon}</div>
            <div className={styles.menulabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
