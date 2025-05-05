import React from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/Group 33910.png';

const SearchBar = ({ placeholder = '검색어를 입력하세요.' }) => {
  return (
    <div className={styles.searchbar}>
      <img src={searchIcon} alt="돋보기" className={styles.searchimg} />
      <input className={styles.searchinput} type="text" placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;
