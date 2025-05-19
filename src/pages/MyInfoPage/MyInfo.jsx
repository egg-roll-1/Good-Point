import React, { useEffect, useState } from 'react';
import styles from './MyInfo.module.css';
import { Layout } from '../../components/Layout/Layout';
import { useAuthGuard } from '../../features/auth/hooks/useAuth';
import { getUserProfile } from '../../features/user/api/api';

function formatPhone(phoneNumber) {
  // 11자리일 때만 하이픈 추가 (ex. 01012345678 → 010-1234-5678)
  if (!phoneNumber) return '';
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}

const MyInfo = () => {
  useAuthGuard(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('유저 정보 불러오기 실패:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!userInfo) return <div>정보를 불러오지 못했습니다.</div>;

  return (
    <Layout>
      <div className={styles.myinfopage}>
        <h2 className={styles.myinfotitle}>회원 정보 조회</h2>
        <div className={styles.myinfolist}>
          <InfoItem label="이름" value={userInfo.name} />
          <InfoItem label="전화번호" value={formatPhone(userInfo.phoneNumber)} />
          <InfoItem label="성별" value={userInfo.gender === 'M' ? '남성' : '여성'} />
          <InfoItem label="나이" value={userInfo.age ? `${userInfo.age}세` : '-'} />
          <InfoItem label="포인트" value={`${userInfo.creditBalance} point`} />
        </div>
        <div className={styles.myinfobuttons}>
          <button className={styles.myinfoBtn}>비밀번호 변경</button>
          <button className={styles.myinfoBtn}>회원 탈퇴</button>
        </div>
      </div>
    </Layout>
  );
};

function InfoItem({ label, value }) {
  return (
    <div className={styles.infoitem}>
      <span className={styles.infolabel}>{label}</span>
      <span className={styles.infovalue}>{value}</span>
    </div>
  );
}

export default MyInfo;
