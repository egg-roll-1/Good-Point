// src/components/MenuGrid.jsx
import React from 'react';
import './MenuGrid.css';

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
    <div className="menu-grid-wrapper">
      <div className="menu-row">
        {menuItems.slice(0, 4).map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="menu-row center-row">
        {menuItems.slice(4).map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
