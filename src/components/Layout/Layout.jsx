import BottomNavigation from '../BottomNavigation/BottomNavigation';
import Header from '../Header/Header';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import { Text } from '../Text/Text';
import { HStack } from '../Stack/HStack';
import { useAuthGuard } from '../../features/auth/hooks/useAuth';

export const Layout = ({ children }) => {
  const isAuthorized = useAuthGuard(false);

  return (
    <div className={styles.layout}>
      <Header>
        {isAuthorized ? (
          <></>
        ) : (
          <Link to={routes.login}>
            <HStack end>
              <Text fontSize="sm" color="var(--goodpoint-fg)">
                로그인/회원가입
              </Text>
            </HStack>
          </Link>
        )}
      </Header>

      {children}
      <BottomNavigation />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.children,
};
