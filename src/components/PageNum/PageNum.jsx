// src/components/PageNum.jsx
import React from 'react';
import './PageNum.css';

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
          className={`page-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="page-num-wrapper">
      <button onClick={() => handleClick(currentPage - 1)} className="arrow-button">◀️</button>
      {renderPageNumbers()}
      <button onClick={() => handleClick(currentPage + 1)} className="arrow-button">▶️</button>
    </div>
  );
};

export default PageNum;
