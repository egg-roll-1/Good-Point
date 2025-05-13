import { useState } from 'react';
import Button from '../../components/Button/Button';
import { Layout } from '../../components/Layout/Layout';
import { useSignUp } from '../../features/auth/hooks/useAuth';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
  const { mutate: signUp, isPending } = useSignUp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(''); // 문자열로 초기화
  const [gender, setGender] = useState('');

  const onClick = () => {
    signUp({
      phoneNumber,
      password,
      name: username,
      age: Number(age),
      gender,
    });
  };

  return (
    <Layout>
      <div className={styles.signupframe}>
        <div className={styles.signuptext}>회원가입</div>
        <div className={styles.signupgroup}>
          <label className={styles.signuplabel}>전화번호</label>
          <input
            className={styles.signupnickname}
            placeholder="전화번호를 입력하세요"
            value={phoneNumber}
            inputMode="numeric"
            maxLength={11}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
              setPhoneNumber(onlyNums);
            }}
          />
        </div>

        <div className={styles.signupgroup}>
          <label className={styles.signuplabel}>비밀번호</label>
          <input
            type="password"
            className={styles.signupnickname}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.signupgroup}>
          <label className={styles.signuplabel}>이름</label>
          <input
            className={styles.signupnickname}
            placeholder="이름을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.signupgroup}>
          <label className={styles.signuplabel}>나이</label>
          <input
            className={styles.signupnickname}
            placeholder="나이를 입력하세요"
            value={age}
            inputMode="numeric"
            onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ''))}
          />
        </div>

        <div className={styles.signupgroup}>
          <label className={styles.signuplabel}>성별</label>
          <div className={styles.signupgender}>
            <input
              type="radio"
              id="male"
              name="gender"
              value="M"
              checked={gender === 'M'}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">남성</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="F"
              checked={gender === 'F'}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">여성</label>
          </div>
        </div>
        {/* 
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
        <input className={styles.signupcheckpw} placeholder="비밀번호 확인" /> */}

        <div className={styles.signupcheckbox}>
          <label htmlFor="agree-checkbox">
            <input type="checkbox" id="agree-checkbox" />
            <span>이용약관 및 개인정보처리방침에 동의합니다</span>
          </label>
        </div>

        <Button
          text={isPending ? '가입중...' : '가입하기'}
          type={'login'}
          onClick={onClick}
          disabled={isPending}
        />
      </div>
    </Layout>
  );
};

export default SignUpPage;
