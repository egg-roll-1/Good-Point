import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useVolunteerWork } from "../../features/volunteer-work/hooks/useVolunteerWork"
import PageNum from '../PageNum/PageNum';
import styles from './VolList.module.css';

const VolList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // useVoulunteerWork 훅을 사용하여 데이터 fetching
  const { data, isLoading, error } = useVolunteerWork({
    page: page, // API가 1부터 시작하는 경우
    size: pageSize,
    keyword: '', // 검색어가 있다면 여기에 추가
  });

  const items = data?.content || [];
  const totalElements = data?.totalElements || 0;

  const handleItemClick = (item) => {
    // 상세 페이지로 이동하면서 ID 전달
    navigate(`/voldetail/${item.id}`);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  // 기간 포맷팅 함수
  const formatPeriod = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
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

    if(isLoading) {
      return <div className={styles.loading}>로딩 중...</div>;
    }

    if(error) {
      return <div className={styles.error}>데이터를 불러오는데 실패했습니다.</div>
    }

    return (
      <div>
      <div className={styles.vllist}>
        {items && items.map((item) => (
          <div
            className={styles.vlitem}
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <div 
              className={`${styles.vlcategory} ${styles[getCategoryFromTags(item.tagList).toLowerCase()]}`}
            >
              {getCategoryFromTags(item.tagList)}
            </div>
            <div className={styles.vlinfo}>
              <div className={styles.vltitleline}>{item.title}</div>
              <div className={styles.vldate}>
                모집: {formatPeriod(item.recruitStartDate, item.recruitEndDate)}
              </div>
              <div className={styles.vlmember}>
                모집인원: {item.recruitPeopleCount}/{item.peopleCount}명
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 페이지네이션 */}
      {items && items.length > 0 && (
        <PageNum
          currentPage={page}
          onPageChange={setPage}
          totalItems={totalElements} // 실제 총 아이템 수로 변경 필요
          pageSize={pageSize}
        />
      )}
    </div>
    );
  };

export default VolList;
