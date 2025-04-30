// src/components/PageNum.jsx
import React from 'react';
import './PageNum.css';
import leftArrow from "../../assets/leftArrow.png"
import rightArrow from "../../assets/rightArrow.png"

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
      <img onClick={() => handleClick(currentPage - 1)} className="arrow-button" src={leftArrow}/>
      {renderPageNumbers()}
      <img onClick={() => handleClick(currentPage + 1)} className="arrow-button" src={rightArrow}/>
    </div>
  );
};

export default PageNum;
