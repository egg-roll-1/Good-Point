import React from 'react';
import styles from './PointGauge.module.css';

const PointGauge = ({ percent }) => {
  return (
    <div className={styles.gaugewrapper}>
      <div className={styles.gaugecontainer}>
        <div className={styles.gaugetrack}>
          <div className={styles.gaugefill} style={{ width: `${44}%` }}>
            <div className={styles.gaugeshine}></div>
          </div>
        </div>

        <div className={styles.gaugeinfo}>
          <span className={styles.gaugepercent}>{Math.round(percent)}%</span>
          <span className={styles.gaugelabel}>포인트 달성률</span>
        </div>
      </div>
    </div>
  );
};

export default PointGauge;
