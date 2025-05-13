import React, { useEffect, useState } from 'react';
import styles from './MyInfo.module.css';
import { Layout } from '../../components/Layout/Layout';
import { useAuthGuard } from '../../features/auth/hooks/useAuth';
import { getUserProfile } from '../../features/user/api/api'; // 유저 정보 API

const MyInfo = () => {
  const isAuth = useAuthGuard(true);
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
          <div>이름 : {userInfo.name}</div>
          <div>전화번호 : {userInfo.phoneNumber}</div>
          <div>성별 : {userInfo.gender === 'M' ? '남성' : '여성'}</div>
          <div>포인트 : {userInfo.creditBalance} point</div>
        </div>
        <div className={styles.myinfobuttons}>
          <button>비밀번호 변경</button>
          <button>회원 탈퇴</button>
        </div>
      </div>
    </Layout>
  );
};

export default MyInfo;
