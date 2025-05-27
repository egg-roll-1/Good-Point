import React, { useState } from 'react';
import PointGauge from '../../components/PointGauge/PointGauge.jsx';
import shibaImage from '../../assets/Shiba Inu Dog Lying Down.png';
import styles from './Point.module.css';
import { Layout } from '../../components/Layout/Layout.jsx';
import { useAuthGuard } from '../../features/auth/hooks/useAuth.js';

const Point = () => {
  useAuthGuard();
  
  // 봉사 시간 관련 상태
  const [volunteerHours, setVolunteerHours] = useState(() => {
    // 로컬스토리지에서 기존 봉사시간 불러오기
    const saved = localStorage.getItem('volunteerHours');
    return saved ? parseFloat(saved) : 0;
  });
  
  const [newHours, setNewHours] = useState('');
  
  // 포인트 계산 (시간당 100P)
  const POINTS_PER_HOUR = 100;
  const totalPoints = Math.floor(volunteerHours * POINTS_PER_HOUR);
  const maxPoint = 200000000;
  const percent = Math.min((totalPoints / maxPoint) * 100, 100);
  
  // 봉사시간 추가 함수
  const addVolunteerHours = () => {
    const hours = parseFloat(newHours);
    if (hours && hours > 0) {
      const updatedHours = volunteerHours + hours;
      setVolunteerHours(updatedHours);
      localStorage.setItem('volunteerHours', updatedHours.toString());
      setNewHours('');
    }
  };
  
  // 봉사 내역 조회 및 포인트 새로고침
  const refreshPoints = () => {
    // 봉사 내역을 보고 반영하게 만들어야함.
    // 현재는 로컬스토리지에서 다시 불러오기
    const saved = localStorage.getItem('volunteerHours');
    const updatedHours = saved ? parseFloat(saved) : 0;
    setVolunteerHours(updatedHours);
    
    console.log('봉사 내역을 조회하여 포인트를 업데이트했습니다.');
  };

  return (
    <Layout>
      <div className={styles.pointpage}>
        <h2 className={styles.pointtitle}>포인트 조회</h2>
        
        {/* 봉사시간 정보 */}
        <div className={styles.volunteerinfo}>
          <h3 className={styles.volunteerTitle}>봉사 활동 현황</h3>
          <p className={styles.volunteerHours}>
            총 봉사시간: <span className={styles.highlight}>{volunteerHours.toFixed(1)}시간</span>
          </p>
          <p className={styles.pointRate}>
            (시간당 {POINTS_PER_HOUR}P 지급)
          </p>
        </div>

        {/* 게이지 */}
        <div className={styles.gaugecontainer}>
          <PointGauge percent={percent} gaugeType="modern" /> 
        </div>

        <img src={shibaImage} alt="시바견" className={styles.shibaimage} />

        {/* 포인트 표시 */}
        <div className={styles.pointinfo}>
          <p className={styles.pointvalue}>
            현재 포인트: 
            <span className={styles.pointnumber}>
              {totalPoints.toLocaleString()}P
            </span>
          </p>
          <p className={styles.maxpoint}>최대: {maxPoint.toLocaleString()}P</p>
        </div>
        {/* 액션 버튼들 */}
        <div className={styles.buttongroup}>
          <button 
            onClick={refreshPoints}
            className={styles.pointbutton}
          >
            포인트 새로고침
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Point;