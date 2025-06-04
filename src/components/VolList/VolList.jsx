import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useVolunteerWork } from "../../features/volunteer-work/hooks/useVolunteerWork"
import PageNum from '../PageNum/PageNum';
import styles from './VolList.module.css';

const VolList = ({ passedData, passedIsLoading, latitude, longitude, keyword}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('전체'); // 카테고리 필터 state 추가

  // useVoulunteerWork 훅을 사용하여 데이터 fetching
  const { data: fetchedData , isLoading : fetchedIsLoading, error } = useVolunteerWork({
    latitude: latitude || '37.49595', // 숭실대 위도(기본))
    longitude: longitude || '126.9571', // 숭실대 경도(기본)
    distanceKm: 10, // 범위: 기본값: 10
    keyword: keyword || '', // 검색어가 있다면 여기에 추가
  });

   // 부모에서 전달받은 데이터가 있으면 사용하고, 없으면 자체적으로 가져온 데이터 사용
  const data = passedData || fetchedData;
  const isLoading = passedIsLoading !== undefined ? passedIsLoading : fetchedIsLoading;
  
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

  // 카테고리별 필터링 로직
  const allItems = data?.content || data?.result || [];
  const filteredItems = selectedCategory === '전체' 
    ? allItems 
    : allItems.filter(item => getCategoryFromTags(item.tagList) === selectedCategory);

  // 클라이언트 사이드 페이지네이션: 필터링된 데이터에 대해 페이지네이션 적용
  const totalElements = filteredItems.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filteredItems.slice(startIndex, endIndex);

  // 카테고리 목록 생성
  const categories = ['전체', '보건', '생활', '재난', '환경', '교육', '기타'];

  const handleItemClick = (item) => {
    // 상세 페이지로 이동하면서 ID 전달
    navigate(`/voldetail/${item.id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // 페이지 변경 시 맨 위로 스크롤
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1); // 카테고리 변경 시 첫 페이지로 이동
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  // 기간 포맷팅 함수
  const formatPeriod = (startDate, endDate) => {
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  };

  if(isLoading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if(error) {
    return <div className={styles.error}>데이터를 불러오는데 실패했습니다.</div>
  }

  return (
    <div>
      {/* 카테고리 필터 combobox */}
      <div className={styles.filterContainer}>
        <span className={styles.resultCount}>
          ({totalElements}개의 봉사활동)
        </span>
        <div className={styles.categoryFilterGroup}>
          <label htmlFor="categoryFilter" className={styles.filterLabel}>
            카테고리:
          </label>
          <select 
            id="categoryFilter"
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className={styles.categorySelect}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.vllist}>
        {items && items.length > 0 ? (
          items.map((item) => (
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
        ))
      ):(
        <div className={styles.nodata}>
          {selectedCategory === '전체' 
            ? '이 지역에 등록된 봉사활동이 없습니다.' 
            : `선택한 카테고리(${selectedCategory})에 등록된 봉사활동이 없습니다.`
          }
        </div>
      )}
      </div>
      
      {/* 페이지네이션 */}
      {items && items.length > 0 && totalElements > pageSize && (
        <PageNum
          currentPage={page}
          onPageChange={handlePageChange}
          totalItems={totalElements}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default VolList;