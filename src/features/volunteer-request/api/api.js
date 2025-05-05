import { authAxios } from '../../auth/config/axios';
import './doc';

/**
 * 봉사활동 신청내역을 가져옵니다.
 * @returns {Promise<VolunteerRequest[]>}
 */
export const getVolunteerRequestList = async () => {
  const { data } = await authAxios.get('/volunteer-request');
  return data.result;
};

/**
 * @typedef {Object} CancelVolunteerRequest
 * @property {string} id 봉사활동 ID
 *
 * @param {CancelVolunteerRequest}
 * @returns {Promise<undefined>}
 */
export const cancelVolunteerRequest = async ({ id }) => {
  const { data } = await authAxios.delete(`/volunteer-request/${id}`);
  return data.result;
};

/**
 * @typedef {Object} Tag
 * @property {number} id - 태그 ID
 * @property {string} title - 태그 제목

 * @typedef {Object} VolunteerRequest
 * @property {number} id - 신청 ID
 * @property {'Wait'|'Reject' | 'Approve' | 'Canceled'} status 신청 상태
 * @property {VolunteerWork} volunteerWork - 태그 목록
 * 
 * @typedef {Object} VolunteerWork
 * @property {number} id - 봉사 ID
 * @property {string} startDate - 봉사 시작 날짜 (ISO 문자열)
 * @property {string} endDate - 봉사 종료 날짜 (ISO 문자열)
 * @property {number} startMinute - 시작 시간 (분 단위)
 * @property {number} endMinute - 종료 시간 (분 단위)
 * @property {string} recruitStartDate - 모집 시작 날짜 (ISO 문자열)
 * @property {string} recruitEndDate - 모집 종료 날짜 (ISO 문자열)
 * @property {string[]} dayOfWeek - 요일 배열 (예: ["MONDAY", "TUESDAY"])
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
