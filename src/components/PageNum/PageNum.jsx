// src/components/PageNum.jsx
import React from 'react';
import styles from './PageNum.module.css';
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';

const PageNum = ({ currentPage, totalItems, pageSize, onPageChange, totalPages: propsTotalPages }) => {
  // totalItems와 pageSize가 제공되면 totalPages 계산
  const totalPages = propsTotalPages || Math.ceil(totalItems / pageSize) || 1;

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // 페이지가 많으면 현재 페이지 주변만 보여주기
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // 더 많은 페이지를 보여줄 수 있도록 시작점 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // 처음 페이지로 가는 버튼 (조건부)
    if (startPage > 1) {
      pages.push(
        <button
          key="first"
          onClick={() => handleClick(1)}
          className={styles.pagebutton}
        >
          1
        </button>
      );
      
      // 중간이 건너뛰었다면 ... 표시
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className={styles.ellipsis}>...</span>);
      }
    }
    
    // 페이지 번호 버튼들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`${styles.pagebutton} ${currentPage === i ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }
    
    // 마지막 페이지로 가는 버튼 (조건부)
    if (endPage < totalPages) {
      // 중간이 건너뛰었다면 ... 표시
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className={styles.ellipsis}>...</span>);
      }
      
      pages.push(
        <button
          key="last"
          onClick={() => handleClick(totalPages)}
          className={styles.pagebutton}
        >
          {totalPages}
        </button>
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
        alt="이전"
      />
      {renderPageNumbers()}
      <img
        onClick={() => handleClick(currentPage + 1)}
        className={styles.arrowbutton}
        src={rightArrow}
        alt="다음"
      />
    </div>
  );
};

export default PageNum;