import React from 'react';
import './PointGauge.css';

const PointGauge = ({ percent }) => {
  return (
    <div className="gauge-wrapper">
      <div className="gauge-fill" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default PointGauge;
