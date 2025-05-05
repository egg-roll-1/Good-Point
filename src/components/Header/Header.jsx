import { ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';
import { Logo } from '../Logo/Logo';
import { HStack } from '../Stack/HStack';
import styles from './Header.module.css';

const Header = ({ back, children }) => {
  return (
    <header className={styles.header}>
      <HStack between>
        <HStack gap={3}>
          {back && <ArrowLeft style={{ color: 'var(--goodpoint-fg)' }} />}
          <Logo />
        </HStack>
        <div>{children}</div>
      </HStack>
    </header>
  );
};

Header.propTypes = {
  back: PropTypes.bool,
  children: PropTypes.element,
};

export default Header;
