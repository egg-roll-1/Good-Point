import React, { useEffect, useState } from 'react';
import { useVolunteerWork } from '../features/volunteer-work/hooks/useVolunteerWork';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout.jsx';
import MenuGrid from '../components/MenuGrid/MenuGrid.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import VolunteerCard from '../components/VolunteerCard/VolunteerCard.jsx';
import { SpacingY } from '../components/Spacing/Spacing.js';

const Main = () => {
  const { data, isLoading, error } = useVolunteerWork();
  const [volunteerList, setVolunteerList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[Main] useVolunteerWork data:', data);
    // data.content가 배열인지 확인한 뒤, 상위 4개만 잘라서 상태에 저장
    if (data && Array.isArray(data.content)) {
      const sliced = data.content.slice(0, 4);
      console.log('[Main] setting volunteerList:', sliced);
      setVolunteerList(sliced);
    }
  }, [data]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  console.log('[Main] volunteerList length:', volunteerList.length);

  return (
    <Layout>
      <div className="main-page" style={{ marginTop: '50px', padding: '20px' }}>
        <SearchBar placeholder="검색어를 입력하세요." />
        <MenuGrid />

        <h2
          style={{
            fontSize: '14px',
            margin: '24px 0 12px',
            fontWeight: 'bold',
          }}
        >
          오늘의 지역정보
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          {volunteerList.length === 0 && <div>표시할 봉사 정보가 없습니다.</div>}
          {volunteerList.map((item) => {
            console.log('✏️ rendering volunteer item:', item);
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/voldetail/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <VolunteerCard
                  region={
                    item.region || (item.workAddress ? item.workAddress.split(' ')[0] : '지역')
                  }
                  title={item.title}
                  people={`${item.recruitPeopleCount} / ${item.peopleCount}명`}
                  recruitDate={`${formatDate(
                    item.recruitStartDate,
                  )} ~ ${formatDate(item.recruitEndDate)}`}
                  volunteerDate={`${formatDate(item.startDate)} ~ ${formatDate(item.endDate)}`}
                  categoryList={item.tagList}
                />
              </div>
            );
          })}
          <SpacingY size="xl" />
        </div>
      </div>
    </Layout>
  );
};

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

export default Main;
