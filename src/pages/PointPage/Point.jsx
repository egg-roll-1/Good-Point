import React, { useState, useEffect } from 'react';
import PointGauge from '../../components/PointGauge/PointGauge.jsx';
import shibaImage from '../../assets/Shiba Inu Dog Lying Down.png';
import styles from './Point.module.css';
import { Layout } from '../../components/Layout/Layout.jsx';
import { useAuthGuard } from '../../features/auth/hooks/useAuth.js';
import { useVolunteerHistory } from '../../features/volunteer-history/hooks/useVolunteerHistory';

const Point = () => {
  useAuthGuard();

  // 봉사 활동 내역 조회
  const { data: volunteerHistory, isLoading, error, refetch } = useVolunteerHistory();

  // 봉사 시간 관련 상태
  const [volunteerHours, setVolunteerHours] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 포인트 계산 (시간당 100P)
  const POINTS_PER_HOUR = 100;
  const totalPoints = Math.floor(volunteerHours * POINTS_PER_HOUR);
  const maxPoint = 10000;
  const percent = Math.min((totalPoints / maxPoint) * 100, 100);

  // 봉사활동 내역에서 총 봉사시간 계산
  const calculateTotalHours = () => {
    if (!volunteerHistory || volunteerHistory.length === 0) {
      return 0;
    }

    // 모든 완료된 봉사활동의 minute를 합산하여 시간으로 변환
    const totalMinutes = volunteerHistory.reduce((total, history) => {
      return total + (history.minute || 0);
    }, 0);

    return totalMinutes / 60; // 분을 시간으로 변환
  };

  // 봉사활동 데이터가 로드되면 자동으로 시간 계산
  useEffect(() => {
    if (volunteerHistory) {
      const calculatedHours = calculateTotalHours();
      setVolunteerHours(calculatedHours);
    }
  }, [volunteerHistory]);

  // 봉사 내역 조회 및 포인트 새로고침
  const refreshPoints = async () => {
    setIsRefreshing(true);
    try {
      // 봉사활동 내역 데이터 새로고침
      await refetch();

      // 계산된 시간으로 포인트 업데이트
      const calculatedHours = calculateTotalHours();
      setVolunteerHours(calculatedHours);

      console.log('봉사 내역을 조회하여 포인트를 업데이트했습니다.');
    } catch (error) {
      console.error('포인트 새로고침 중 오류 발생:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Layout>
        <div className={styles.pointpage}>
          <h2 className={styles.pointtitle}>포인트 조회</h2>
          <div>로딩 중...</div>
        </div>
      </Layout>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <Layout>
        <div className={styles.pointpage}>
          <h2 className={styles.pointtitle}>포인트 조회</h2>
          <div>데이터를 불러오는데 실패했습니다.</div>
        </div>
      </Layout>
    );
  }

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
          <p className={styles.completedCount}>
            완료한 활동: <span className={styles.highlight}>{volunteerHistory?.length || 0}건</span>
          </p>
          <p className={styles.pointRate}>(시간당 {POINTS_PER_HOUR}P 지급)</p>
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
            <span className={styles.pointnumber}>{totalPoints.toLocaleString()}P</span>
          </p>
          <p className={styles.maxpoint}>최대: {maxPoint.toLocaleString()}P</p>
        </div>

        {/* 액션 버튼들 */}
        <div className={styles.buttongroup}>
          <button onClick={refreshPoints} className={styles.pointbutton} disabled={isRefreshing}>
            {isRefreshing ? '새로고침 중...' : '포인트 새로고침'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Point;
