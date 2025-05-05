import React from 'react';
import styles from './PointGauge.module.css';

const PointGauge = ({ percent }) => {
  return (
    <div className={styles.gaugewrapper}>
      <div className={styles.gaugefill} style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default PointGauge;
