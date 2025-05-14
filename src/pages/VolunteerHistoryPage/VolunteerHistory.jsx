import SearchBar from '../../components/SearchBar/SearchBar';
import VolList from '../../components/VolList/VolList';
import { useState } from 'react';
import PageNum from '../../components/PageNum/PageNum';
import styles from './VolunteerHistory.module.css';
import { Layout } from '../../components/Layout/Layout';

const VolunteerHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Layout>
      <div className={styles.volunteerhistory}>
        <h2 className={styles.vhtitle}>봉사 내역</h2>

        <SearchBar placeholder="무엇이든 찾아보세요" />

        <VolList /> {/*여기 수정해야 됨 */}
        <PageNum
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default VolunteerHistory;
