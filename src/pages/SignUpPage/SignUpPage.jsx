import Button from '../../components/Button/Button';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.signupframe}>
      <div className={styles.signuptext}>회원가입</div>
      <div className={styles.signupgroup}>
        <input className={styles.signupnickname} placeholder="닉네임" />
        <div className={styles.signupcheckbtn}>
          <Button text={'중복확인'} type={'duplicate'} />
        </div>
      </div>
      <div className={styles.signupgroup}>
        <input className={styles.signupid} placeholder="아이디" />
        <div className={styles.signupcheckbtn}>
          <Button text={'중복확인'} type={'duplicate'} />
        </div>
      </div>
      <input className={styles.signuppw} placeholder="비밀번호" />
      <input className={styles.signupcheckpw} placeholder="비밀번호 확인" />
      <div className={styles.signupcheckbox}>
        <input type="checkbox" id="agree-checkbox" className={styles.signupcheckbox} />
        <label htmlFor="agree-checkbox">이용약관 및 개인정보처리방침에 동의합니다</label>
      </div>
      <Button text={'가입하기'} type={'login'} />
    </div>
  );
};

export default SignUpPage;
