import React from 'react';
import styles from './VolRequested.module.css';

const VolRequested = ({ data, showCancelButton = false }) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        신청한 봉사활동이 없습니다.
      </div>
    );
  }

  return (
    <div className={styles.requestedList}>
      {data.map((item) => (
        <div key={item.id} className={styles.requestedItem}>
          <div className={styles.itemHeader}>
            <div className={styles.category}>{item.category}</div>
            <div className={styles.status}>신청완료</div>
          </div>
          
          <div className={styles.itemContent}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.organization}>{item.organization}</div>
            
            <div className={styles.itemDetails}>
              <div className={styles.detailRow}>
                <span className={styles.label}>기간:</span>
                <span className={styles.value}>{item.period}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>시간:</span>
                <span className={styles.value}>{item.time}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>장소:</span>
                <span className={styles.value}>{item.location}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>모집인원:</span>
                <span className={styles.value}>{item.currentParticipants}/{item.maxParticipants}명</span>
              </div>
            </div>
          </div>
          
          {showCancelButton && (
            <div className={styles.actionButton}>
              <button 
                className={styles.cancelButton}
                onClick={item.onCancel}
              >
                신청 취소
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VolRequested;