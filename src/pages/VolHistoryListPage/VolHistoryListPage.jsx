import SearchBar from '../../components/SearchBar/SearchBar';
import VolCompleted from '../../components/VolCompleted/VolCompleted'; 
import { useState } from 'react';
import PageNum from '../../components/PageNum/PageNum';
import styles from './VolHistoryListPage.module.css';
import { Layout } from '../../components/Layout/Layout';
import { useVolunteerHistory } from "../../features/volunteer-history/hooks/useVolunteerHistory"
import { useAuthGuard } from '../../features/auth/hooks/useAuth';

const VolHistoryListPage = () => {
  // 로그인 상태 확인 (로그인되지 않은 경우 리다이렉트)
  const isAuthenticated = useAuthGuard();

  
  
  // 페이지네이션 상태 추가 -> 5개가 한페이지
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 페이지당 5개
  
  // 봉사 활동 내역 조회
  const { data: volunteerHistory, isLoading, error } = useVolunteerHistory();

  // 날짜 포맷팅 함수 (ISO 8601 문자열용)
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  // 시간 포맷팅 함수 (ISO 8601 문자열용)
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // 기간 포맷팅 함수
  const formatPeriod = (startDateTime, endDateTime) => {
    return `${formatDateTime(startDateTime)} ~ ${formatDateTime(endDateTime)}`;
  };

  // 시간 범위 포맷팅 함수
  const formatTimeRange = (startDateTime, endDateTime) => {
    return `${formatTime(startDateTime)} ~ ${formatTime(endDateTime)}`;
  };

  // 분을 시간으로 변환하는 함수
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`;
    }
    return `${mins}분`;
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Layout>
        <div className={styles.volunteerhistory}>
          <h2 className={styles.vhtitle}>활동 내역</h2>
          <div>로딩 중...</div>
        </div>
      </Layout>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <Layout>
        <div className={styles.volunteerhistory}>
          <h2 className={styles.vhtitle}>활동 내역</h2>
          <div>데이터를 불러오는데 실패했습니다.</div>
        </div>
      </Layout>
    );
  }

  // 데이터 가공 (VolCompleted 컴포넌트에 필요한 형태로 변환)
   const processedData = volunteerHistory?.map(history => ({
    id: history.id,
    title: history.volunteerWork?.title || `봉사활동 #${history.id}`, // volunteerWork에서 title 가져오기
    organization: history.volunteerWork?.organization || '봉사기관', // volunteerWork에서 기관명 가져오기
    location: history.volunteerWork?.location || '장소미정', // volunteerWork에서 장소 가져오기
    currentParticipants: 1, // 기본값
    maxParticipants: history.volunteerWork?.maxParticipants || 1, // volunteerWork에서 최대 참가자 수 가져오기
    category: history.volunteerWork?.category || '기타', // volunteerWork에서 카테고리 가져오기
    period: formatPeriod(history.startDateTime, history.endDateTime),
    time: formatTimeRange(history.startDateTime, history.endDateTime),
    duration: formatDuration(history.minute),
    status: 'Completed', // 완료된 활동이므로
     credit: `${history.credit?.amount || 0}점`, // 객체를 문자열로 변환
    startDateTime: history.startDateTime,
    endDateTime: history.endDateTime,
    minute: history.minute,
    volunteerWork: history.volunteerWork // 원본 volunteerWork 데이터도 포함
  })) || [];

  // 페이지네이션 로직
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = processedData.slice(startIndex, endIndex);

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <Layout>
      <div className={styles.volunteerhistory}>
        <h2 className={styles.vhtitle}>활동 내역</h2>
        
        <SearchBar placeholder="무엇이든 찾아보세요" />
        
        <div className={styles.bottomsheetcontent}>
          {currentPageData.length > 0 ? (
            <VolCompleted
              data={currentPageData}
              showCancelButton={false} // 완료된 활동이므로 취소 버튼 숨김
            />
          ) : (
            <div className={styles.emptyState}>
              완료한 봉사활동이 없습니다.
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalItems > 0 && (
          <PageNum 
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default VolHistoryListPage;