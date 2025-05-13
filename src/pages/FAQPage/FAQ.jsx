// src/pages/FAQPage/FAQ.jsx
import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import PageNum from '../../components/PageNum/PageNum.jsx';
import { Layout } from '../../components/Layout/Layout.jsx';
import styles from './FAQ.module.css';

const faqData = [
  {
    question: '비밀번호를 여러번 틀려서 계정이 잠겼는데요. 어떻게 풀 수 있나요?',
    answer:
      '계정 잠금은 일정 시간이 지나면 자동 해제됩니다. 긴급히 해제해야 할 경우 고객센터에 문의해주세요.',
  },
  {
    question: '탈퇴하면 모든 포인트가 삭제되나요?',
    answer: '네, 탈퇴 시 보유한 포인트는 모두 소멸됩니다.',
  },
  {
    question: '신청한 봉사를 취소할 수 있나요?',
    answer: '봉사 시작 24시간 전까지는 취소가 가능합니다.',
  },
  {
    question: '포인트는 유효기간이 있나요?',
    answer: '포인트는 지급일로부터 1년간 유효합니다.',
  },
  {
    question: '봉사활동 참여 후 포인트가 지급되지 않았어요.',
    answer: '지급은 최대 1~2일 소요될 수 있으며, 미지급 시 고객센터로 문의 바랍니다.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleAnswer = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <Layout>
      <div className={styles.faqpage}>
        <h2 className={styles.faqtitle}>자주 묻는 질문</h2>
        <SearchBar placeholder="무엇이든 찾아보세요" />

        <div className={styles.faqlist}>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`${styles.faqitem} ${openIndex === index ? styles.active : ''}`}
              onClick={() => toggleAnswer(index)}
              onMouseEnter={(e) => e.currentTarget.classList.add(styles.hover)}
              onMouseLeave={(e) => e.currentTarget.classList.remove(styles.hover)}
            >
              <div className={styles.question}>
                <span className={styles.qmark}>Q</span>
                <span className={styles.questionText}>{item.question}</span>
              </div>
              {openIndex === index && <div className={styles.answer}>{item.answer}</div>}
            </div>
          ))}
        </div>

        <PageNum currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </div>
    </Layout>
  );
};

export default FAQ;
