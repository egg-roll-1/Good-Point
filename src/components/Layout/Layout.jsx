import BottomNavigation from '../BottomNavigation/BottomNavigation';
import Header from '../Header/Header';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <BottomNavigation />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.children,
};
