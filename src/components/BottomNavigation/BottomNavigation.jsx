import React from 'react';
import styles from './BottomNavigation.module.css'; // 또는 Link가 필요한 경우 둘 다
import { Link } from 'react-router';
import routes from '../../constants/routes';
import { HStack } from '../Stack/HStack';
import { VStack } from '../Stack/VStack';

const BottomNavigation = () => {
  return (
    <nav className={styles.navigation}>
      <HStack around>
        <NavItem icon="🏠" label="홈" pathname={routes.main} />
        <NavItem icon="🤝" label="봉사활동" pathname={routes.volmap} />
        <NavItem icon="💰" label="포인트" pathname={routes.point} />
        <NavItem icon="👤" label="내 정보" pathname={routes.myinfo} />
      </HStack>
    </nav>
  );
};

const NavItem = ({ icon, label, pathname }) => (
  <Link to={{ pathname }}>
    <VStack>
      <div className={styles.footericon}>{icon}</div>
      <div className={styles.footerlabel}>{label}</div>
    </VStack>
  </Link>
);

export default BottomNavigation;
