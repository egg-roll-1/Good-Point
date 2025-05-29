import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout.jsx';
import MenuGrid from '../components/MenuGrid/MenuGrid.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import VolunteerCard from '../components/VolunteerCard/VolunteerCard.jsx';
import { useNavigate } from 'react-router-dom';
import { getVolunteerWorkList } from '../features/volunteer-work/api/api'; // 실제 경로 맞게 수정!

const Main = () => {
  const [volunteerList, setVolunteerList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 봉사활동 리스트 받아오기
    getVolunteerWorkList().then((data) => {
      setVolunteerList((data.result || []).slice(0, 4));
    });
  }, []);

  // 카드 클릭시 상세페이지로 이동
  const handleCardClick = (id) => {
    navigate(`/voldetail/${id}`);
  };

  return (
    <Layout>
      <div className="main-page" style={{ marginTop: '50px', padding: '20px' }}>
        <SearchBar placeholder="검색어를 입력하세요." />
        <MenuGrid />

        <h2 style={{ fontSize: '14px', margin: '24px 0 12px', fontWeight: 'bold' }}>
          오늘의 지역정보
        </h2>

        <div style={styles.cardGrid}>
          {volunteerList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <VolunteerCard {...item} />
            </div>
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
  },
};

export default Main;
