import React from 'react';
import PointGauge from '../../components/PointGauge/PointGauge.jsx';
import shibaImage from '../../assets/Shiba Inu Dog Lying Down.png';
import './Point.css';


const Point = () => {
  const point = 123456789;
  const maxPoint = 200000000;
  const percent = Math.min((point / maxPoint) * 100, 100);

  return (
    <div className="point-page">
      <h2 className="point-title">포인트 조회</h2>

      <div className="gauge-container">
        <PointGauge percent={percent} />
      </div>

      <img src={shibaImage} alt="시바견" className="shiba-image" />

      <p className="point-value">포인트: {point.toLocaleString()}</p>

      <button className="point-button">포인트 조회</button>
    </div>
  );
};

export default Point;
