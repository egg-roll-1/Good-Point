// src/pages/Main.jsx
import React from 'react';
import SearchBar from '../components/SearchBar.jsx';
import Footer from '../components/Footer.jsx';
import MenuGrid from '../components/MenuGrid.jsx';
import VolunteerCard from '../components/VolunteerCard.jsx';

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
      }
  ];
const Main = () => {
    return (
      <div className="main-page" style={{ padding: '20px', boxSizing: 'border-box' }}>
        <SearchBar />
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
    );
  };
  
  const styles = {
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      paddingBottom: '80px'
    },
  };
  

export default Main;
