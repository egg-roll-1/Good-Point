// VolunteerCard.jsx
import React from 'react';
import styles from './VolunteerCard.module.css';

const CATEGORY_TAGS = ['생활편의', '보건의료', '재난재해', '환경보호', '교육지도'];

const CATEGORY_MAP = {
  보건의료: '보건',
  생활편의: '생활',
  재난재해: '재난',
  환경보호: '환경',
  교육지도: '교육',
};

function getCategoryFromTags(tagList = []) {
  if (!Array.isArray(tagList) || tagList.length === 0) {
    return '기타';
  }
  const firstMatch = tagList.find((tag) => CATEGORY_TAGS.includes(tag.title));
  if (!firstMatch) {
    return '기타';
  }
  return CATEGORY_MAP[firstMatch.title] || firstMatch.title;
}

const VolunteerCard = ({ title, people, recruitDate, volunteerDate, categoryList = [] }) => {
  const category = getCategoryFromTags(categoryList);

  return (
    <div className={styles.volunteercard}>
      <div className={`${styles.badge} ${styles[category]}`}>{category}</div>

      <p className={styles.title}>{title}</p>
      <p className={styles.detail}>모집인원: {people}</p>
      <p className={styles.detail}>모집기간: {recruitDate}</p>
      <p className={styles.detail}>봉사기간: {volunteerDate}</p>
    </div>
  );
};

export default VolunteerCard;
