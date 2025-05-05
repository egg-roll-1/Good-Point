import SearchBar from '../../components/SearchBar/SearchBar';
import VolList from '../../components/VolList/VolList';
import { useState } from 'react';
import PageNum from '../../components/PageNum/PageNum';
import styles from './VolunteerHistory.module.css';

const VolunteerHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.volunteerhistory}>
      <h2 className={styles.vhtitle}>봉사 내역</h2>

      <SearchBar placeholder="무엇이든 찾아보세요" />

      <VolList />
      <PageNum
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default VolunteerHistory;
