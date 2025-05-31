// src/components/PageNum.jsx
import React from 'react';
import styles from './PageNum.module.css';
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';

const PageNum = ({ currentPage, totalItems, pageSize, onPageChange, totalPages: propsTotalPages }) => {
  // totalItems와 pageSize가 제공되면 totalPages 계산
  const totalPages = propsTotalPages || Math.ceil(totalItems / pageSize) || 1;

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (event, page) => {
    if (event.key == 'Enter' || ElementInternals.key === ' ') {
      event.preventDefault();
      handleClick(page); 
    }
  }

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
          onKeyDown={(e) => handleKeyDown(e, 1)}
          className={styles.pagebutton}
          aria-label="첫 페이지로 이동"
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
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`${styles.pagebutton} ${currentPage === i ? styles.active : ''}`}
          aria-label={`${i}페이지로 이동`}
          aria-current={currentPage === i ? 'page' : undefined}
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
          onKeyDown={(e) => handleKeyDown(e, totalPages)}
          className={styles.pagebutton}
          aria-label="마지막 페이지로 이동"
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };
  
  // 총 페이지가 1개 이하면 페이지네이션 표시 x
  if (totalPages <= 1) {
    return null;
  }

  return (
   <nav className={styles.pagenumwrapper} aria-label="페이지 네비게이션">
      <button
        onClick={() => handleClick(currentPage - 1)}
        onKeyDown={(e) => handleKeyDown(e, currentPage - 1)}
        className={`${styles.arrowbutton} ${currentPage === 1 ? styles.disabled : ''}`}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <img src={leftArrow} alt="이전" />
      </button>
      
      {renderPageNumbers()}
      
      <button
        onClick={() => handleClick(currentPage + 1)}
        onKeyDown={(e) => handleKeyDown(e, currentPage + 1)}
        className={`${styles.arrowbutton} ${currentPage === totalPages ? styles.disabled : ''}`}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        <img src={rightArrow} alt="다음" />
      </button>
    </nav>
  );
};

export default PageNum;