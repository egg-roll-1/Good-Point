import Button from '../../components/Button/Button';
import styles from './LoginPage.module.css';

import Line from '../../assets/Line.png';

const LoginPage = () => {
  return (
    <div className={styles.loginframe}>
      <div className={styles.logintextlogin}>로그인</div>
      <input className={styles.logininputid} placeholder="아이디" />
      <input className={styles.logininputpw} placeholder="비밀번호" />
      <Button text={'로그인'} type={'login'} />
      <div className={styles.logindivwrapper}>
        <div className={styles.loginoverlapgroup}>
          <img className={styles.loginline} src={Line} />
          <img className={styles.loginline2} src={Line} />
          <p className={styles.loginp}>아이디 찾기 | 비밀번호 찾기</p>
        </div>
      </div>
      <Button text={'회원가입'} type={'brightLogin'} />
    </div>
  );
};

export default LoginPage;
