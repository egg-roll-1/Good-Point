import React from 'react';
import './SearchBar.css';
import searchIcon from '../assets/Group 33910.svg';

const SearchBar = () => {
  return (
<div className="search-bar">
  <img src={searchIcon} alt="돋보기" className="search-img" />
  <input
    className="search-input"
    type="text"
    placeholder="검색어를 입력하세요."
  />
</div>
  );
};

export default SearchBar; 
