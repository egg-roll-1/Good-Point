import styles from './Header.module.css';
import bell from '../../assets/bell.png';

const Header = () => {
  return (
    <div className={styles.headeruppernavigator}>
      <div className={styles.headeroverlapgroup}>
        <img className={styles.headerimg} src={bell} />
        <div className={styles.headertitle}>Good-Point</div>
        <div className={styles.headerlogin}>로그인/회원가입</div>
      </div>
    </div>
  );
};

export default Header;
