import BottomNavigation from '../BottomNavigation/BottomNavigation';
import Header from '../Header/Header';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import { Text } from '../Text/Text';
import { HStack } from '../Stack/HStack';
import { useAuthGuard, useLogout } from '../../features/auth/hooks/useAuth'; // useLogout 추가
import { ToastContainer } from 'react-toastify';

export const Layout = ({ children }) => {
  const isAuthorized = useAuthGuard(false);
  const logoutMutation = useLogout(); // useLogout 훅 사용

  // 로그아웃 핸들러
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className={styles.layout}>
      <Header>
        {isAuthorized ? (
          <HStack end>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending} // 로딩 상태 처리
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                opacity: logoutMutation.isPending ? 0.6 : 1, // 로딩 시 투명도 조절
              }}
            >
              <Text fontSize="sm" color="var(--goodpoint-fg)">
                {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
              </Text>
            </button>
          </HStack>
        ) : (
          <Link to={routes.login} style={{ textDecoration: 'none' }}>
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
      <ToastContainer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node, // PropTypes.children -> PropTypes.node로 수정
};
