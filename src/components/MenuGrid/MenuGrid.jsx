// src/components/MenuGrid.jsx
import React from 'react';
import styles from './MenuGrid.module.css';
import { useNavigate } from 'react-router-dom';

// (1) 아이콘을 import
import regionIcon from '../../assets/지역봉사.png';
import historyIcon from '../../assets/신청내역.png';
import infoIcon from '../../assets/이용정보.png';
import myinfoIcon from '../../assets/마이페이지.png';
import pointIcon from '../../assets/포인트조회.png';
import faqIcon from '../../assets/자주묻는질문.png';

// (2) menuItems 배열의 icon 필드에 import한 변수를 할당
const menuItems = [
  { icon: regionIcon, label: '지역봉사', to: '/volmap' },
  { icon: historyIcon, label: '신청내역', to: '/volapply' },
  { icon: infoIcon, label: '이용정보', to: '/info' },
  { icon: myinfoIcon, label: '마이페이지', to: '/myinfo' },
  { icon: pointIcon, label: '포인트조회', to: '/point' },
  { icon: faqIcon, label: '자주묻는질문', to: '/faq' },
];

const MenuGrid = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.menugridwrapper}>
      {/* 상단 4개 메뉴 */}
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
            <div className={styles.menuicon}>
              {/* (3) img 태그로 아이콘 표시 */}
              <img src={item.icon} alt={item.label} className={styles.iconImage} />
            </div>
            <div className={styles.menulabel}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 하단 2개 메뉴 (가운데 정렬) */}
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
            <div className={styles.menuicon}>
              <img src={item.icon} alt={item.label} className={styles.iconImage} />
            </div>
            <div className={styles.menulabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
