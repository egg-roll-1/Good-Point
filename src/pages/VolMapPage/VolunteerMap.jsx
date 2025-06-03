import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import VolList from '../../components/VolList/VolList';
import styles from './VolunteerMap.module.css';

import Group33910 from '../../assets/Group 33910.png';
import { Layout } from '../../components/Layout/Layout';
import { useVolunteerWork } from '../../features/volunteer-work/hooks/useVolunteerWork';

const VolunteerMap = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); // 봉사활동 마커들을 관리할 ref
  const currentLocationMarkerRef = useRef(null); // 현재 위치 마커 ref
  const currentInfoWindowRef = useRef(null); // 현재 열린 정보창 ref
  const currentMarkerRef = useRef(null); // 현재 정보창이 열린 마커 ref
  
  const [currentPosition, setCurrentPosition] = useState({
    lat: 33.450701, // 기본값 (위치 권한이 거부될 경우 사용)
    lng: 126.570667,
  });
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 변경: useVolunteerWorkByGeometry 대신 useVolunteerWork 사용
  const { data, isLoading: isDataLoading } = useVolunteerWork({
    latitude: currentPosition.lat,
    longitude: currentPosition.lng,
    distanceKm: 10, // 기본 검색 범위 설정
    keyword: searchKeyword, // 검색어
  });

  // 스와이프 핸들러 설정
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setBottomSheetVisible(true),
    onSwipedDown: () => setBottomSheetVisible(false),
    preventDefaultTouchmoveEvent: true, // 스와이프 중 기본 스크롤 방지
    trackMouse: false, // 모바일에서만 작동하도록 설정 (선택적)
    delta: 10, // 스와이프로 인식할 최소 거리 (픽셀)
  });

  // 현재 열린 정보창을 닫는 함수
  const closeCurrentInfoWindow = () => {
    if (currentInfoWindowRef.current) {
      currentInfoWindowRef.current.close();
      currentInfoWindowRef.current = null;
      currentMarkerRef.current = null;
    }
  };

  // 기존 마커들을 지우는 함수
  const clearMarkers = () => {
    closeCurrentInfoWindow(); // 정보창도 함께 닫기
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];
  };

  // 봉사활동 위치에 마커 표시하는 함수
  const displayVolunteerMarkers = (volunteerData = data) => {
    console.log('🔍 displayVolunteerMarkers 호출됨');
    console.log('🗺️ mapInstance.current:', !!mapInstance.current);
    console.log('📊 받은 volunteerData:', volunteerData);
    
    // 데이터 구조 확인 및 배열 추출
    let dataArray = volunteerData;
    if (volunteerData && volunteerData.content) {
      dataArray = volunteerData.content;
      console.log('✅ content 배열 사용:', dataArray);
    } else if (volunteerData && volunteerData.result) {
      dataArray = volunteerData.result;
      console.log('✅ result 배열 사용:', dataArray);
    } else if (Array.isArray(volunteerData)) {
      dataArray = volunteerData;
      console.log('✅ 직접 배열 사용:', dataArray);
    }
    
    console.log('📋 dataArray isArray:', Array.isArray(dataArray));
    console.log('📏 dataArray length:', dataArray?.length);
    
    if (!mapInstance.current) {
      console.log('❌ 지도 인스턴스가 없음');
      return;
    }
    
    if (!dataArray || !Array.isArray(dataArray)) {
      console.log('❌ 데이터 배열이 없거나 유효하지 않음');
      return;
    }
    
    if (dataArray.length === 0) {
      console.log('⚠️ 데이터 배열이 비어있음');
      return;
    }

    // 기존 봉사활동 마커들 제거
    clearMarkers();
    console.log('🧹 기존 마커 제거 완료');

    // 봉사활동 데이터의 각 위치에 마커 표시
    let successCount = 0;
    dataArray.forEach((volunteer, index) => {
      console.log(`\n🔸 ${index}번째 봉사활동 처리 중:`, volunteer);
      
      // 위도/경도 필드명 확인 (다양한 필드명 지원)
      const lat = parseFloat(volunteer.latitude || volunteer.lat || volunteer.y);
      const lng = parseFloat(volunteer.longitude || volunteer.lng || volunteer.lon || volunteer.x);
      
      console.log(`📍 ${index}번째 위치 - lat: ${lat}, lng: ${lng}`);
      console.log(`✔️ 유효성 검사 - lat valid: ${!isNaN(lat) && lat !== 0}, lng valid: ${!isNaN(lng) && lng !== 0}`);

      if (lat && lng && !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
        try {
          console.log(`🚀 ${index}번째 마커 생성 시작`);
          
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          console.log('📌 마커 위치 객체 생성:', markerPosition);
          
          // 봉사활동 마커 생성 (기본 빨간 마커)
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            title: volunteer.title || `봉사활동 ${index + 1}`,
            clickable: true // 클릭 가능하도록 명시적 설정
          });

          console.log('🎯 마커 객체 생성 완료:', marker);
          
          // 지도에 마커 추가
          marker.setMap(mapInstance.current);
          markersRef.current.push(marker);
          successCount++;
          
          console.log(`✅ ${index}번째 마커 생성 및 지도 추가 완료 (총 ${successCount}개)`);

          // 마커 클릭 이벤트 - 봉사활동 상세 정보 표시 (토글 기능)
          window.kakao.maps.event.addListener(marker, 'click', () => {
            console.log('🖱️ 마커 클릭됨:', volunteer.title);
            
            // 같은 마커를 다시 클릭한 경우 정보창 닫기
            if (currentMarkerRef.current === marker && currentInfoWindowRef.current) {
              console.log('🔄 같은 마커 재클릭 - 정보창 닫기');
              closeCurrentInfoWindow();
              return;
            }

            // 다른 마커를 클릭한 경우 기존 정보창 닫기
            closeCurrentInfoWindow();

            // 새로운 정보창 생성 및 열기
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `
                <div style="padding:8px;min-width:200px;max-width:300px;">
                  <div style="font-weight:bold;color:#2c5aa0;margin-bottom:3px;">
                    ${volunteer.title || '봉사활동'}
                  </div>
                  <div style="font-size:12px;color:#666;margin-bottom:2px;">
                    📍 ${volunteer.workAddress || volunteer.workPlace || '위치 정보 없음'}
                  </div>
                  <div style="font-size:11px;color:#888;">
                    🏢 ${volunteer.agencyTitle || '기관 정보 없음'}
                  </div>
                  <div style="font-size:11px;color:#888;margin-top:2px;">
                    👥 모집인원: ${volunteer.recruitPeopleCount || 0}명
                  </div>
                </div>
              `,
            });
            
            infowindow.open(mapInstance.current, marker);
            console.log('📋 정보창 열림');
            
            // 현재 열린 정보창과 마커 추적
            currentInfoWindowRef.current = infowindow;
            currentMarkerRef.current = marker;
          });
          
        } catch (error) {
          console.error(`❌ ${index}번째 마커 생성 중 오류:`, error);
        }
      } else {
        console.log(`⚠️ ${index}번째 데이터의 위치 정보가 유효하지 않음 - lat:${lat}, lng:${lng}`);
      }
    });
    
    console.log(`\n🎉 마커 생성 완료! 총 ${successCount}/${dataArray.length}개의 마커가 생성됨`);
    console.log('📍 생성된 마커 수:', markersRef.current.length);
    
    // 마커가 하나도 생성되지 않은 경우 추가 정보 출력
    if (successCount === 0) {
      console.log('❌ 마커가 하나도 생성되지 않았습니다!');
      console.log('🔍 첫 번째 데이터 상세:', dataArray[0]);
      console.log('🔍 데이터 키 목록:', Object.keys(dataArray[0] || {}));
    }
  };

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('현재 위치를 가져오는데 실패했습니다:', error);
          setLocationError(error.message);
          setIsLoading(false);
        },
        { enableHighAccuracy: true },
      );
    } else {
      setLocationError('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
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
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=6136a490f434bfc3fa3a345ef676333a&libraries=services&autoload=false';

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

      // 현재 위치에 마커 표시 (기본 마커)
      const markerPosition = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
      
      currentLocationMarkerRef.current = new window.kakao.maps.Marker({
        position: markerPosition,
        title: '현재 위치',
        // image는 제거하여 기본 마커 사용
      });
      currentLocationMarkerRef.current.setMap(mapInstance.current);

      // 지도 클릭 시 정보창 닫기
      window.kakao.maps.event.addListener(mapInstance.current, 'click', () => {
        closeCurrentInfoWindow();
      });
    };

    // 카카오맵 SDK 로드 함수 호출
    loadKakaoMaps();

    // 컴포넌트 언마운트시 정리 함수
    return () => {
      clearMarkers();
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setMap(null);
      }
    };
  }, [currentPosition, isLoading]);

  // 봉사활동 데이터가 변경될 때마다 마커 업데이트
  useEffect(() => {
    console.log('🔄 useEffect 데이터 변경 감지:', data);
    console.log('🗺️ mapInstance.current 존재:', !!mapInstance.current);
    console.log('📊 data 존재:', !!data);
    
    if (!mapInstance.current) {
      console.log('⚠️ 지도 인스턴스가 아직 준비되지 않음 - 대기 중');
      return;
    }
    
    if (!data) {
      console.log('⚠️ 데이터가 아직 없음 - 대기 중');
      return;
    }
    
    // 데이터 구조 확인 후 적절한 배열 추출
    const volunteerList = data.content || data.result || data;
    console.log('📋 실제 사용할 봉사활동 목록:', volunteerList);
    console.log('📏 목록 길이:', volunteerList?.length);
    console.log('✅ 배열 여부:', Array.isArray(volunteerList));
    
    if (Array.isArray(volunteerList) && volunteerList.length > 0) {
      console.log('🚀 displayVolunteerMarkers 호출 예정');
      displayVolunteerMarkers(volunteerList);
    } else {
      console.log('❌ 봉사활동 목록이 배열이 아니거나 비어있음');
      if (!Array.isArray(volunteerList)) {
        console.log('🔍 volunteerList 타입:', typeof volunteerList);
        console.log('🔍 volunteerList 내용:', volunteerList);
      }
    }
  }, [data]);

  // 검색 기능
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchKeyword.trim() || !mapInstance.current || !window.kakao) return;

    // 검색 시 열린 정보창 닫기
    closeCurrentInfoWindow();

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
        }

        // 검색된 장소들이 모두 보이도록 지도 범위 설정
        mapInstance.current.setBounds(bounds);
        
        // 검색된 첫 번째 장소의 위치로 currentPosition 업데이트
        if (data && data.length > 0) {
          setCurrentPosition({
            lat: parseFloat(data[0].y),
            lng: parseFloat(data[0].x)
          });
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 없습니다.');
      } else {
        alert('검색 중 오류가 발생했습니다.');
      }
    });
  };

  return (
    <Layout>
      <div className={styles.volunteermapcontainer}>
        {isLoading ? (
          <div className={styles.loadingmessage}>위치 정보를 불러오는 중...</div>
        ) : locationError ? (
          <div className={styles.errorcontainer}>
            <p>위치 정보를 가져오는데 문제가 발생했습니다: {locationError}</p>
            <p>기본 위치(숭실대)로 지도를 표시합니다.</p>
            <div id="map" ref={mapContainer} className={styles.mapview} />
          </div>
        ) : (
          <div className={styles.mapcontainer}>
            <div id="map" ref={mapContainer} className={styles.mapview} />
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
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </form>

            {/* 바텀 시트 봉사정보 */}
            {bottomSheetVisible && (
              <div className={styles.bottomsheetcontent}>
                <div className={styles.volunteertitletext}>지역 봉사</div>
                <VolList 
                  passedData={data} 
                  passedIsLoading={isDataLoading}
                  latitude={currentPosition.lat}
                  longitude={currentPosition.lng}
                  keyword={searchKeyword}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerMap;