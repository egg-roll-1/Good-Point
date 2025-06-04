// src/pages/FAQPage/FAQ.jsx
import React, { useState } from 'react';
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
  const [pageSize] = useState(4); // 페이지당 3개씩 보여주도록 변경 (테스트용)

  // 클라이언트 사이드 페이지네이션
  const allItems = faqData;
  const totalElements = allItems.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = allItems.slice(startIndex, endIndex);

  const toggleAnswer = (globalIndex) => {
    // 전역 인덱스를 사용하여 올바른 FAQ 항목을 토글
    setOpenIndex(globalIndex === openIndex ? null : globalIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setOpenIndex(null); // 페이지 변경 시 열린 답변 닫기
    // 페이지 변경 시 맨 위로 스크롤
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <Layout>
      <div className={styles.faqpage}>
        <h2 className={styles.faqtitle}>자주 묻는 질문</h2>

        <div className={styles.faqlist}>
          {items.map((item, localIndex) => {
            // 전역 인덱스 계산 (현재 페이지의 시작 인덱스 + 로컬 인덱스)
            const globalIndex = startIndex + localIndex;
            
            return (
              <div
                key={globalIndex}
                className={`${styles.faqitem} ${openIndex === globalIndex ? styles.active : ''}`}
                onClick={() => toggleAnswer(globalIndex)}
                onMouseEnter={(e) => e.currentTarget.classList.add(styles.hover)}
                onMouseLeave={(e) => e.currentTarget.classList.remove(styles.hover)}
              >
                <div className={styles.question}>
                  <span className={styles.qmark}>Q</span>
                  <span className={styles.questionText}>{item.question}</span>
                </div>
                {openIndex === globalIndex && (
                  <div className={styles.answer}>{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 - VolList와 동일한 방식으로 수정 */}
        {items && items.length > 0 && totalElements > pageSize && (
          <PageNum
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalItems={totalElements}
            pageSize={pageSize}
          />
        )}
      </div>
    </Layout>
  );
};

export default FAQ;