import React from 'react';
import styles from './VolunteerCard.module.css';

const VolunteerCard = ({ region, title, people, recruitDate, volunteerDate }) => {
  return (
    <div className={styles.volunteercard}>
      <div className={styles.badgerow}>
        <span className={styles.badge}>재난</span>
        <span className={styles.badge}>재해</span>
        <span className={styles.badge}>{region}</span>
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.detail}>모집인원: {people}</p>
      <p className={styles.detail}>모집기간: {recruitDate}</p>
      <p className={styles.detail}>봉사기간: {volunteerDate}</p>
    </div>
  );
};

export default VolunteerCard;
