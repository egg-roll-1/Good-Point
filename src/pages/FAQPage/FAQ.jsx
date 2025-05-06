import { Layout } from '../../components/Layout/Layout.jsx';
import PageNum from '../../components/PageNum/PageNum.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import React, { useState } from 'react';
import styles from './FAQ.module.css';

const faqData = [
  '비밀번호를 여러번 틀려서 계정이 잠겼는데요. 어떻게 풀 수 있나요?',
  '탈퇴하면 모든 포인트가 삭제되나요?',
  '신청한 봉사를 취소할 수 있나요?',
  '포인트는 유효기간이 있나요?',
  '봉사활동 참여 후 포인트가 지급되지 않았어요.',
];

const FAQ = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Layout>
      <div className={styles.faqpage}>
        <h2 className={styles.faqtitle}>자주 묻는 질문</h2>

        <SearchBar placeholder="무엇이든 찾아보세요" />

        <div className={styles.faqlist}>
          {faqData.map((question, index) => (
            <div key={index} className={styles.faqitem}>
              <span className={styles.faqq}>Q</span>
              <span className={styles.faqquestion}>{question}</span>
            </div>
          ))}
        </div>

        <PageNum
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default FAQ;
