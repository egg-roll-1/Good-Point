import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import PageNum from '../../components/PageNum/PageNum';
import './VolunteerHistory.css';

const mockData = [
  { category: '보건', title: '[보건 의료] 이용정보가 안내', date: '2023.04.08' },
  { category: '생활', title: '[생활 편의] 이용정보가 안내', date: '2023.04.07' },
  { category: '재난', title: '[재난 재해] 이용정보가 안내', date: '2023.04.06' },
  { category: '보건', title: '[보건 의료] 이용정보가 안내', date: '2023.04.05' },
];

const VolunteerHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="volunteer-history">
      <h2 className="vh-title">봉사 내역</h2>

      <SearchBar placeholder="무엇이든 찾아보세요" />

      <div className="vh-list">
        {mockData.map((item, index) => (
          <div className="vh-item" key={index}>
            <div className={`vh-category ${item.category}`}>{item.category}</div>
            <div className="vh-info">
              <p className="vh-title-line">{item.title}</p>
              <p className="vh-date">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      <PageNum
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default VolunteerHistory;
