import React from 'react';
import { Layout } from '../components/Layout/Layout.jsx';
import MenuGrid from '../components/MenuGrid/MenuGrid.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import VolunteerCard from '../components/VolunteerCard/VolunteerCard.jsx';

const volunteerList = [
  {
    region: '경북',
    title: '[사전신청] 산불 재난지역 자원봉사자 모집',
    people: 'xxx명',
    recruitDate: '2025.xx',
    volunteerDate: '2025.xx',
  },
  {
    region: '경북',
    title: '[사전신청] 산불 재난지역 자원봉사자 모집',
    people: 'xxx명',
    recruitDate: '2025.xx',
    volunteerDate: '2025.xx',
  },
  {
    region: '경북',
    title: '[사전신청] 산불 재난지역 자원봉사자 모집',
    people: 'xxx명',
    recruitDate: '2025.xx',
    volunteerDate: '2025.xx',
  },
  {
    region: '경북',
    title: '[사전신청] 산불 재난지역 자원봉사자 모집',
    people: 'xxx명',
    recruitDate: '2025.xx',
    volunteerDate: '2025.xx',
  },
];
const Main = () => {
  return (
    <Layout>
      <div className="main-page" style={{ marginTop: '50px', padding: '20px' }}>
        <SearchBar placeholder="검색어를 입력하세요." />
        <MenuGrid />

        <h2 style={{ fontSize: '14px', margin: '24px 0 12px', fontWeight: 'bold' }}>
          오늘의 지역정보
        </h2>

        <div style={styles.cardGrid}>
          {volunteerList.map((item, index) => (
            <VolunteerCard key={index} {...item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    // paddingBottom: '80px',
  },
};

export default Main;
