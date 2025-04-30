import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import PageNum from '../../components/PageNum/PageNum.jsx';
import './FAQ.css';

const faqData = [
  "비밀번호를 여러번 틀려서 계정이 잠겼는데요. 어떻게 풀 수 있나요?",
  "탈퇴하면 모든 포인트가 삭제되나요?",
  "신청한 봉사를 취소할 수 있나요?",
  "포인트는 유효기간이 있나요?",
  "봉사활동 참여 후 포인트가 지급되지 않았어요.",
];

const FAQ = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="faq-page">
      <h2 className="faq-title">자주 묻는 질문</h2>

      <SearchBar placeholder="무엇이든 찾아보세요" />

      <div className="faq-list">
        {faqData.map((question, index) => (
          <div key={index} className="faq-item">
            <span className="faq-q">Q</span>
            <span className="faq-question">{question}</span>
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

export default FAQ;
