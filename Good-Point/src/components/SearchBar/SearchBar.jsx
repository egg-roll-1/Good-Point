import React from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/Group 33910.png';

const SearchBar = ({ placeholder = "검색어를 입력하세요." }) => {
  return (
    <div className="search-bar">
      <img src={searchIcon} alt="돋보기" className="search-img" />
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
