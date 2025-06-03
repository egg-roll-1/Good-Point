import React from 'react';
import styles from './InfoPage.module.css';
import { Layout } from '../../components/Layout/Layout';

const Info = () => {
  return (
    <Layout>
      <div className={styles.info}>
        <h2>앱 사용 가이드</h2>
        <section>
          <h3>1. 회원가입 및 로그인</h3>
          <p>
            전화번호와 비밀번호를 입력하여 회원가입 후, 로그인하면 다양한 봉사활동 정보를 이용할 수
            있습니다.
          </p>
        </section>
        <section>
          <h3>2. 봉사활동 검색 및 신청</h3>
          <p>
            검색창 또는 메뉴에서 원하는 봉사활동을 검색해보세요. 상세 정보를 확인하고 신청할 수
            있습니다.
          </p>
        </section>
        <section>
          <h3>3. 포인트 확인</h3>
          <p>[포인트조회]에서 누적 포인트를 확인할 수 있습니다.</p>
        </section>
        <section>
          <h3>4. 내 정보 관리</h3>
          <p>[마이페이지]에서 연락처, 비밀번호 등 내 정보를 관리할 수 있습니다.</p>
        </section>
        <section>
          <h3>5. FAQ 및 고객지원</h3>
          <p>궁금한 점은 [자주묻는질문]에서 찾아보거나, 고객센터를 이용하세요.</p>
        </section>
        <section>
          <h3>6. 유의사항</h3>
          <ul>
            <li>신청 전 봉사 상세정보를 꼭 확인하세요.</li>
            <li>포인트 적립은 봉사활동 완료 후 자동으로 진행됩니다.</li>
            <li>개인정보 보호를 위해 내 정보를 안전하게 관리하세요.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default Info;
