import { useState } from 'react';
import Button from '../../components/Button/Button';
import styles from './LoginPage.module.css';
import Line from '../../assets/Line.png';
import { Layout } from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import { useLogin } from '../../features/auth/hooks/useAuth';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin(); // error 추가

  const handleLogin = (e) => {
    if (e) e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    
    // 유효성 검사
    if (!phoneNumber.trim()) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    
    login({ phoneNumber, password });
  };

  // 에러 메시지 표시 함수
  const getErrorMessage = () => {
    if (!error) return null;
    
    // 서버에서 온 에러 메시지 확인
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error.response?.status === 401) {
      return '전화번호 또는 비밀번호가 올바르지 않습니다.';
    }
    
    if (error.response?.status === 404) {
      return '존재하지 않는 사용자입니다.';
    }
    
    // 기본 에러 메시지
    return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
  };

  return (
    <Layout>
      <div className={styles.loginframe}>
        <div className={styles.logintextlogin}>로그인</div>
        
        {/* 폼으로 감싸서 Enter 키 지원 */}
        <form onSubmit={handleLogin}>
          <div className={styles.logininputgroup}>
            <label className={styles.loginlabel}>전화번호</label>
            <input
              className={styles.logininput}
              placeholder="전화번호를 입력하세요"
              inputMode="numeric"
              maxLength={11}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber((e.target.value || '').replace(/[^0-9]/g, ''))}
              disabled={isPending}
            />
          </div>

          <div className={styles.logininputgroup}>
            <label className={styles.loginlabel}>비밀번호</label>
            <input
              className={styles.logininput}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
          </div>

          {/* 에러 메시지 표시 */}
          {error && (
            <div style={{ 
              color: 'red', 
              fontSize: '14px', 
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {getErrorMessage()}
            </div>
          )}

          {/* 버튼 타입을 submit으로 변경 */}
          <Button
            text={isPending ? '로그인 중...' : '로그인'}
            type={"login"}
            onClick={handleLogin}
            disabled={isPending}
            
          />
        </form>

        <div className={styles.logindivwrapper}>
          <div className={styles.loginoverlapgroup}>
            <img className={styles.loginline} src={Line} alt="line1" />
            <img className={styles.loginline2} src={Line} alt="line2" />
            <p className={styles.loginp}>비밀번호 찾기</p>
          </div>
        </div>

        <Link to={routes.signup}>
          <Button text={'회원가입'} type={'brightLogin'} />
        </Link>
      </div>
    </Layout>
  );
};

export default LoginPage;