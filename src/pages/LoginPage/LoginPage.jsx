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
  const { mutate: login, isPending } = useLogin();

  const handleLogin = () => {
    login({ phoneNumber, password });
  };

  return (
    <Layout>
      <div className={styles.loginframe}>
        <div className={styles.logintextlogin}>로그인</div>

        <div className={styles.logininputgroup}>
          <label className={styles.loginlabel}>전화번호</label>
          <input
            className={styles.logininput}
            placeholder="전화번호를 입력하세요"
            inputMode="numeric"
            maxLength={11}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber((e.target.value || '').replace(/[^0-9]/g, ''))}
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
          />
        </div>

        <Button
          text={isPending ? '로그인 중...' : '로그인'}
          type="login"
          onClick={handleLogin}
          disabled={isPending}
        />

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
