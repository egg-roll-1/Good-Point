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
  
  // 로그아웃 핸들러
  const handleLogout = () => {
    // 로컬스토리지에서 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken'); // 혹시 다른 이름으로 저장된 경우
    
    // 페이지 새로고침하여 로그인 상태 업데이트
    window.location.reload();
  };

  return (
    <div className={styles.layout}>
      <Header>
        {isAuthorized ? (
          <HStack end>
            <button 
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                padding: '4px 8px'
              }}
            >
              <Text fontSize="sm" color="var(--goodpoint-fg)">
                로그아웃
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
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.children,
};