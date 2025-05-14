import React from 'react';
import { useParams } from 'react-router-dom';
import { useVolunteerWorkDetail } from '../../features/volunteer-work/hooks/useVolunteerWork';
import { requestVolunteerWork } from '../../features/volunteer-work/api/api';
import styles from './VolDetailPage.module.css';
import Button from '../../components/Button/Button';
import { Layout } from '../../components/Layout/Layout';

const VolDetailPage = () => {
  const { id } = useParams();
  
  // API를 통해 상세 데이터 가져오기
  const { data, isLoading, error } = useVolunteerWorkDetail({ id: parseInt(id) });

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
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
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

  // 봉사 신청 핸들러
  const handleApply = async () => {
    try {
      await requestVolunteerWork({ id: parseInt(id) });
      alert('봉사 신청이 완료되었습니다.');
    } catch (error) {
      console.error('봉사 신청 실패:', error);
      alert('봉사 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };



  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loading}>로딩 중...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.error}>데이터를 불러오는데 실패했습니다.</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div>데이터가 없습니다.</div>
      </Layout>
    );
  }

  const category = getCategoryFromTags(data.tagList);

  return (
    <Layout>
      <div className={styles.voldetailcontainer}>
        <div className={styles.voldetailheader}>
         <div className={`${styles.volcategory} ${styles[category]}`}>
            {category}
          </div>
          <div className={styles.voldetailtitle}>{data.title}</div>
        </div>
        <div className={styles.voldetaildate}>
          등록일: {formatDate(data.startDate)}
        </div>
        <div className={styles.voldetailinfo}>
          <div className={styles.voldetailitem}>
            <h3>모집 인원</h3>
            <p>{data.recruitPeopleCount} / {data.peopleCount}명</p>
          </div>

          <div className={styles.voldetailitem}>
            <h3>모집 기간</h3>
            <p>{formatPeriod(data.recruitStartDate, data.recruitEndDate)}</p>
          </div>

          <div className={styles.voldetailitem}>
            <h3>봉사 기간</h3>
            <p>{formatPeriod(data.startDate, data.endDate)}</p>
          </div>

          <div className={styles.voldetailitem}>
            <h3>활동 시간</h3>
            <p>{formatTime(data.startMinute)} ~ {formatTime(data.endMinute)}</p>
          </div>

          <div className={styles.voldetailitem}>
            <h3>활동 장소</h3>
            <p>{data.workPlace}</p>
            <p>{data.workAddress}</p>
          </div>

          <div className={styles.voldetailitem}>
            <h3>주관 기관</h3>
            <p>{data.agencyTitle}</p>
            <p>연락처: {data.agencyPhoneNumber}</p>
          </div>

          {data.notice && (
            <div className={styles.voldetailitem}>
              <h3>공지사항</h3>
              <p className={styles.voldetaildescription}>{data.notice}</p>
            </div>
          )}
        </div>
        <div className={styles.voldetailbutton}>
          <Button type={'action'} text={'신청하기'} onClick={handleApply} />
        </div>
      </div>
    </Layout>
  );
};

export default VolDetailPage;