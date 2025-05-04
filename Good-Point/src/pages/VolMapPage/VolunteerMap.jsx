import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable'; // 먼저 'npm install react-swipeable' 실행 필요
import VolList from "../../components/VolList/VolList";
import PageNum from '../../components/PageNum/PageNum';
import styles from './VolunteerMap.module.css';

import Line from "../../assets/Line.png"
import Group33910 from "../../assets/Group 33910.png"



const VolunteerMap = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 33.450701,  // 기본값 (위치 권한이 거부될 경우 사용)
    lng: 126.570667
  });
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 스와이프 핸들러 설정
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setBottomSheetVisible(true),
    onSwipedDown: () => setBottomSheetVisible(false),
    preventDefaultTouchmoveEvent: true, // 스와이프 중 기본 스크롤 방지
    trackMouse: false, // 모바일에서만 작동하도록 설정 (선택적)
    delta: 10, // 스와이프로 인식할 최소 거리 (픽셀)
  });

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("현재 위치를 가져오는데 실패했습니다:", error);
          setLocationError(error.message);
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      setIsLoading(false);
    }
  }, []);

  // 카카오맵 로드 및 초기화
  useEffect(() => {
    if (isLoading) return; // 위치 정보를 기다림
    
    // 카카오맵 SDK를 로드하는 함수
    const loadKakaoMaps = () => {
      // 이미 카카오맵 SDK가 로드되었는지 확인
      if (window.kakao && window.kakao.maps) {
        initializeMap();
        return;
      }

      // 카카오맵 SDK를 위한 스크립트 요소 생성
      const script = document.createElement('script');
      script.async = true;
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=6136a490f434bfc3fa3a345ef676333a&libraries=services&autoload=false";
      
      // SDK 로드 완료 후 지도 초기화
      script.onload = () => {
        window.kakao.maps.load(initializeMap);
      };
      
      document.head.appendChild(script);
    };

    // SDK가 로드된 후 지도를 초기화하는 함수
    const initializeMap = () => {
      const options = {
        center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
        level: 3, // 지도 확대 레벨
      };

      // 지도 인스턴스 생성
      mapInstance.current = new window.kakao.maps.Map(mapContainer.current, options);
      
      // 현재 위치에 마커 표시
      const markerPosition = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(mapInstance.current);
    };

    // 카카오맵 SDK 로드 함수 호출
    loadKakaoMaps();

    // 컴포넌트 언마운트시 정리 함수
    return () => {
      // 필요한 경우 이벤트 리스너나 리소스 정리
    };
  }, [currentPosition, isLoading]);

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // 검색 실행 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchKeyword.trim() || !mapInstance.current || !window.kakao) return;

    // 장소 검색 객체 생성
    const ps = new window.kakao.maps.services.Places();
    
    // 키워드로 장소 검색
    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 첫 번째 장소로 지도 중심 이동
        const bounds = new window.kakao.maps.LatLngBounds();
        
        // 검색 결과 장소들의 좌표를 bounds에 추가
        for (let i = 0; i < data.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(data[i].y, data[i].x);
          bounds.extend(placePosition);
          
          // 각 장소에 마커 표시 (옵션)
          const marker = new window.kakao.maps.Marker({
            position: placePosition
          });
          marker.setMap(mapInstance.current);
        }
        
        // 검색된 장소들이 모두 보이도록 지도 범위 설정
        mapInstance.current.setBounds(bounds);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
      } else {
        alert("검색 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <div className={styles.volunteermapcontainer}>
      {isLoading ? (
        <div className={styles.loadingmessage}>위치 정보를 불러오는 중...</div>
      ) : locationError ? (
        <div className={styles.errorcontainer}>
          <p>위치 정보를 가져오는데 문제가 발생했습니다: {locationError}</p>
          <p>기본 위치(제주도)로 지도를 표시합니다.</p>
          <div
            id="map"
            ref={mapContainer}
            className={styles.mapview}
          />
        </div>
      ) : (
        <div className={styles.mapcontainer}>
          <div
            id="map"
            ref={mapContainer}
            className={styles.mapview}
          />
        </div>
      )}

      {/* 스와이프 영역: 바텀 시트와 핸들 모두 포함 */}
      <div {...swipeHandlers} className={styles.swipeablearea}>

        {/* 바텀 시트 */}
        <div className={`${styles.bottomsheet} ${bottomSheetVisible ? styles.expanded : ''}`}>
          {/* 검색 바 - 입력 가능한 form으로 변경, 버튼 제거 */}
          <form className={styles.searchform} onSubmit={handleSearch}>
            <div className={styles.searchbar}>
              <img className={styles.searchbarimg} src={Group33910} />
              <input
                type="text"
                className={styles.searchinput}
                placeholder="지역 검색"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          {/* 바텀 시트 봉사정보 */}
          {bottomSheetVisible && (
            <div className={styles.bottomsheetcontent}>
              <div className={styles.volunteertitletext}>지역 봉사</div>
              <VolList/>
              <PageNum
              currentPage={currentPage}
              totalPages={5}
              onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerMap;