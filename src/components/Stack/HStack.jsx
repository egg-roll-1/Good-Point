import PropTypes from 'prop-types';
import styles from './Stack.module.css';

/**
 * Horizontal 수평 레이아웃을 위한 box.
 * @param {*} param0
 * @returns
 */
export const HStack = ({ children, between, center, around, gap }) => {
  const justifyContent = between
    ? 'space-between'
    : center
      ? 'center'
      : around
        ? 'space-around'
        : undefined;

  return (
    <div
      className={styles.hstack}
      style={{
        justifyContent,
        gap,
      }}
    >
      {children}
    </div>
  );
};

HStack.propTypes = {
  children: PropTypes.element.isRequired,
  between: PropTypes.bool,
  center: PropTypes.bool,
  around: PropTypes.bool,
  gap: PropTypes.number,
};
