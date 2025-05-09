/**
 * @typedef {Object} Tag
 * @property {number} id - 태그 ID
 * @property {string} title - 태그 제목
 *
 * @typedef {Object} VolunteerWork
 * @property {number} id - 봉사 ID
 * @property {string} title - 봉사 제목
 * @property {number} maxHour - 최대 봉사 인정 시간
 * @property {string} startDate - 봉사 시작 날짜 (ISO 문자열)
 * @property {string} endDate - 봉사 종료 날짜 (ISO 문자열)
 * @property {number} startMinute - 시작 시간 (분 단위)
 * @property {number} endMinute - 종료 시간 (분 단위)
 * @property {string} recruitStartDate - 모집 시작 날짜 (ISO 문자열)
 * @property {string} recruitEndDate - 모집 종료 날짜 (ISO 문자열)
 * @property {('Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat')[]} dayOfWeek - 활동 요일 배열
 * @property {number} peopleCount - 총 모집 인원
 * @property {number} recruitPeopleCount - 현재 모집 인원
 * @property {string} workAddress - 주소
 * @property {string} workPlace - 장소
 * @property {string} latitude - 위도
 * @property {string} longitude - 경도
 * @property {number} agencyId - 기관 ID
 * @property {string} agencyTitle - 기관 이름
 * @property {string} agencyPhoneNumber - 기관 전화번호
 * @property {Tag[]} tagList - 태그 목록
 *
 * @typedef {Object} VolunteerWorkDetail
 * @property {number} id - 봉사 ID
 * @property {string} title - 봉사 제목
 * @property {string} notice - 공지사항
 * @property {number} maxHour - 최대 봉사 인정 시간
 * @property {string} startDate - 봉사 시작 날짜 (ISO 문자열)
 * @property {string} endDate - 봉사 종료 날짜 (ISO 문자열)
 * @property {number} startMinute - 시작 시간 (분 단위)
 * @property {number} endMinute - 종료 시간 (분 단위)
 * @property {string} recruitStartDate - 모집 시작 날짜 (ISO 문자열)
 * @property {string} recruitEndDate - 모집 종료 날짜 (ISO 문자열)
 * @property {('Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat')[]} dayOfWeek - 활동 요일 배열
 * @property {number} peopleCount - 총 모집 인원
 * @property {number} recruitPeopleCount - 현재 모집 인원
 * @property {string} workAddress - 작업 주소
 * @property {string} workPlace - 작업 장소
 * @property {string} latitude - 위도
 * @property {string} longitude - 경도
 * @property {number} agencyId - 기관 ID
 * @property {string} agencyTitle - 기관 이름
 * @property {string} agencyPhoneNumber - 기관 전화번호
 * @property {Tag[]} tagList - 태그 목록
 */

export const Types = {};
