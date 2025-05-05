// src/components/PageNum.jsx
import React from 'react';
import styles from './PageNum.module.css';
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';

const PageNum = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`${styles.pagebutton} ${currentPage === i ? styles.active : ''}`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className={styles.pagenumwrapper}>
      <img
        onClick={() => handleClick(currentPage - 1)}
        className={styles.arrowbutton}
        src={leftArrow}
      />
      {renderPageNumbers()}
      <img
        onClick={() => handleClick(currentPage + 1)}
        className={styles.arrowbutton}
        src={rightArrow}
      />
    </div>
  );
};

export default PageNum;
