import React from 'react';
import PointGauge from '../../components/PointGauge/PointGauge.jsx';
import shibaImage from '../../assets/Shiba Inu Dog Lying Down.png';
import styles from './Point.module.css';


const Point = () => {
  const point = 123456789;
  const maxPoint = 200000000;
  const percent = Math.min((point / maxPoint) * 100, 100);

  return (
    <div className={styles.pointpage}>
      <h2 className={styles.pointtitle}>포인트 조회</h2>

      <div className={styles.gaugecontainer}>
        <PointGauge percent={percent} />
      </div>

      <img src={shibaImage} alt="시바견" className={styles.shibaimage} />

      <p className={styles.pointvalue}>포인트: {point.toLocaleString()}</p>

      <button className={styles.pointbutton}>포인트 조회</button>
    </div>
  );
};

export default Point;
