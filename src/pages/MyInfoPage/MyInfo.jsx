import React, { useEffect, useState } from 'react';
import styles from './MyInfo.module.css';
import { Layout } from '../../components/Layout/Layout';
import { useAuthGuard } from '../../features/auth/hooks/useAuth';
import { getUserProfile } from '../../features/user/api/api';
import { useNavigate } from 'react-router-dom';

const MyInfo = () => {
  useAuthGuard(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPwModal, setShowPwModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

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

  if (loading)
    return (
      <Layout>
        <div className={styles.myinfopage}>
          <div className={styles.loading}>로딩 중...</div>
        </div>
      </Layout>
    );

  if (!userInfo)
    return (
      <Layout>
        <div className={styles.myinfopage}>
          <div className={styles.error}>정보를 불러오지 못했습니다.</div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.myinfopage}>
        <h2 className={styles.myinfotitle}>회원 정보 조회</h2>

        <div className={styles.myinfolist}>
          <div>
            <div className={styles.label}>이름</div>
            <div className={styles.value}>{userInfo.name}</div>
          </div>

          <div>
            <div className={styles.label}>전화번호</div>
            <div className={styles.value}>{userInfo.phoneNumber}</div>
          </div>

          <div>
            <div className={styles.label}>성별</div>
            <div className={styles.value}>{userInfo.gender === 'M' ? '남성' : '여성'}</div>
          </div>

          <div>
            <div className={styles.label}>포인트</div>
            <div className={styles.value}>{userInfo.creditBalance?.toLocaleString()} point</div>
          </div>
        </div>
        {showPwModal && <ChangePasswordModal onClose={() => setShowPwModal(false)} />}
        {showDeleteModal && (
          <DeleteUserModal
            onClose={() => setShowDeleteModal(false)}
            onSuccess={handleAfterDelete}
          />
        )}
      </div>
    </Layout>
  );
};

export default MyInfo;
