import SearchBar from '../../components/SearchBar/SearchBar';
import VolRequested from '../../components/VolRequested/VolRequested'; 
import { useState } from 'react';
import PageNum from '../../components/PageNum/PageNum';
import styles from './VolunteerHistory.module.css';
import { Layout } from '../../components/Layout/Layout';
import { useVolunteerRequest, useVolunteerWorkCancel } from "../../features/volunteer-request/hooks/useVolunteerRequest"
// 여기 페이지 수정해야됨
const VolunteerHistory = () => {

  // 페이지네이션 상태 추가 -> 5개가 한페이지
  const [ currentPage, setCurrentPage ] = useState(1);
  const pageSize = 5; // 페이지당 5개
  
  // 봉사 신청 내역 조회
  const { data: volunteerRequests, isLoading, error, refetch } = useVolunteerRequest();
  
  // 봉사 신청 취소 mutation
  const cancelMutation = useVolunteerWorkCancel();

   // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  // 기간 포맷팅 함수
  const formatPeriod = (startDate, endDate) => {
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  };

  // 시간 포맷팅 함수
  const formatTimeRange = (startMinute, endMinute) => {
  const formatSingleTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  
  return `${formatSingleTime(startMinute)} ~ ${formatSingleTime(endMinute)}`;
};
  
  // 태그에서 카테고리 추출 함수
  const getCategoryFromTags = (tagList) => {
    if (!tagList || tagList.length === 0) return '기타';
    
    // 태그 목록에서 카테고리 태그 찾기
    const categoryTags = ['생활편의', '보건의료', '재난재해', '환경보호', '교육지도'];
    const foundTag = tagList.find(tag => categoryTags.includes(tag.title));
    
    if (!foundTag) return '기타';
    
    // 카테고리 매핑
    const categoryMap = {
      '보건의료': '보건',
      '생활편의': '생활',
      '재난재해': '재난',
      '환경보호': '환경',
      '교육지도': '교육',
    };
    
    return categoryMap[foundTag.title] || foundTag.title;
  };

  // 봉사 신청 내역 취소하기
 const handleCancel = async (volunteerRequestId) => {
  try {
    // 이 부분 추가 ↓
    console.log('취소 API 호출 - ID:', volunteerRequestId);
    console.log('API URL:', `/volunteer-request/${volunteerRequestId}`);
    
    const result = await cancelMutation.mutateAsync({id: volunteerRequestId});
    console.log('취소 결과:', result);
    
    alert('봉사활동 신청이 취소되었습니다');
    const refetchResult = await refetch();
    console.log('refetch 결과:', refetchResult);

    // 현재 페이지에 데이터가 없으면 이전 페이지로 이동
    const newData = refetchResult.data?.filter(request => request.status !== 'Canceled') || [];
    const newTotalPages = Math.ceil(newData.length / pageSize);
    if(currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
    
  } catch(error) {
    console.error('취소 실패:', error);
    alert('취소에 실패했습니다. 다시 시도해주세요');
  }
};

   // 로딩 상태 처리
  if (isLoading) {
    return (
      <Layout>
        <div className={styles.volunteerhistory}>
          <h2 className={styles.vhtitle}>신청 내역</h2>
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
          <h2 className={styles.vhtitle}>신청 내역</h2>
          <div>데이터를 불러오는데 실패했습니다.</div>
        </div>
      </Layout>
    );
  }

  // 데이터 가공 (VolRequested에 필요한 형태로 변환)
const processedData = volunteerRequests
  ?.filter(request => request.status !== 'Canceled') // 취소된 항목 제외
  ?.map(request => ({
    ...request,
    id: request.volunteerWork.id,
    title: request.volunteerWork.title,
    organization: request.volunteerWork.organization || '기관명', 
    location: request.volunteerWork.location || '장소미정',
    currentParticipants: request.volunteerWork.currentParticipants || 0,
    maxParticipants: request.volunteerWork.maxParticipants || 0,
    category: getCategoryFromTags(request.volunteerWork.tagList),
    period: formatPeriod(request.volunteerWork.startDate, request.volunteerWork.endDate),
    time: formatTimeRange(request.volunteerWork.startMinute, request.volunteerWork.endMinute),
    status: request.status,
    onCancel: () => handleCancel(request.id)
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
        <h2 className={styles.vhtitle}>신청 내역</h2>
        
        <SearchBar placeholder="무엇이든 찾아보세요" />
        
       <div className={styles.bottomsheetcontent}>
            {currentPageData.length > 0 ? (
              <VolRequested
                data={currentPageData}
                showCancelButton={true}
              />
            ) : (
              <div className={styles.emptyState}>
                신청한 봉사활동이 없습니다.
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

export default VolunteerHistory;
