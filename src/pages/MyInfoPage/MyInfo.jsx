import React, { useEffect, useState } from 'react';
import styles from './MyInfo.module.css';
import { Layout } from '../../components/Layout/Layout';
import { useAuthGuard } from '../../features/auth/hooks/useAuth';
import { getUserProfile, changePassword, deleteUser } from '../../features/user/api/api';
import { useNavigate } from 'react-router-dom';

// 전화번호 하이픈
function formatPhone(phoneNumber) {
  if (!phoneNumber) return '';
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}

// 비밀번호 변경 모달
const ChangePasswordModal = ({ onClose }) => {
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    if (!oldPw || !newPw) {
      setMsg('모든 항목을 입력하세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await changePassword(oldPw, newPw);
      setMsg(res.message || '비밀번호가 변경되었습니다.');
    } catch (err) {
      setMsg(err?.response?.data?.message || '비밀번호 변경에 실패했습니다.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h4>비밀번호 변경</h4>
        <input
          type="password"
          placeholder="현재 비밀번호"
          value={oldPw}
          onChange={(e) => setOldPw(e.target.value)}
          className={styles.modalInput}
        />
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          className={styles.modalInput}
        />
        <div className={styles.modalBtns}>
          <button onClick={handleChange} disabled={loading}>
            변경하기
          </button>
          <button onClick={onClose}>닫기</button>
        </div>
        <div className={styles.modalMsg}>{msg}</div>
      </div>
    </div>
  );
};

// 회원 탈퇴 모달
const DeleteUserModal = ({ onClose, onSuccess }) => {
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm !== '탈퇴') {
      setMsg('확인을 위해 "탈퇴"를 입력하세요.');
      return;
    }
    setLoading(true);
    try {
      await deleteUser();
      setMsg('회원 탈퇴가 완료되었습니다.');
      setTimeout(onSuccess, 1200);
    } catch (err) {
      setMsg(err?.response?.data?.message || '회원 탈퇴에 실패했습니다.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h4>정말 탈퇴하시겠습니까?</h4>
        <p style={{ fontSize: '0.98rem', marginBottom: 10 }}>
          확인을 위해 <b>"탈퇴"</b>를 입력하세요.
        </p>
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder='"탈퇴" 입력'
          className={styles.modalInput}
        />
        <div className={styles.modalBtns}>
          <button onClick={handleDelete} disabled={loading}>
            탈퇴
          </button>
          <button onClick={onClose}>닫기</button>
        </div>
        <div className={styles.modalMsg}>{msg}</div>
      </div>
    </div>
  );
};

// 정보 표시용 컴포넌트
function InfoItem({ label, value }) {
  return (
    <div className={styles.infoitem}>
      <span className={styles.infolabel}>{label}</span>
      <span className={styles.infovalue}>{value}</span>
    </div>
  );
}

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

  // 회원 탈퇴 후 로컬스토리지 토큰 삭제 및 메인 이동
  const handleAfterDelete = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  if (loading) return <div>로딩 중...</div>;
  if (!userInfo) return <div>정보를 불러오지 못했습니다.</div>;

  return (
    <Layout>
      <div className={styles.myinfopage}>
        <h2 className={styles.myinfotitle}>회원 정보 조회</h2>
        <div className={styles.myinfolist}>
          <InfoItem label="이름" value={userInfo.name} />
          <InfoItem label="전화번호" value={formatPhone(userInfo.phoneNumber)} />
          <InfoItem
            label="성별"
            value={userInfo.gender === 'M' ? '남성' : userInfo.gender === 'F' ? '여성' : ''}
          />
          <InfoItem label="나이" value={userInfo.age ? `${userInfo.age}세` : '없음'} />
          <InfoItem label="포인트" value={`${userInfo.creditBalance} point`} />
        </div>
        <div className={styles.myinfobuttons}>
          <button className={styles.myinfoBtn} onClick={() => setShowPwModal(true)}>
            비밀번호 변경
          </button>
          <button className={styles.myinfoBtn} onClick={() => setShowDeleteModal(true)}>
            회원 탈퇴
          </button>
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
