import { authAxios, publicAxios } from '../../auth/config/axios';

/**
 * 봉사활동 목록을 가져옵니다.
 * @typedef {Object} GetVolunteerWorkRequest
 * @property {string} latitude 위도
 * @property {string} longitude 경도
 *
 * @param {GetVolunteerWorkRequest}
 *
 * @returns {Promise<PagingResponse<VolunteerWork[]>>}
 */
export const getVolunteerWorkList = async ({ latitude, longitude }) => {
  const { data } = await publicAxios.get('/volunteer-work', {
    params: {
      latitude,
      longitude,
    },
  });

  return data.result;
};

/**
 * 봉사활동 상세를 가져옵니다.
 * @typedef {Object} GetVolunteerWorkDetailRequest
 * @property {number} id 봉사활동 ID
 *
 * @param {GetVolunteerWorkDetailRequest}
 * @returns {Promise<VolunteerWork>}
 */
export const getVolunteerWorkDetail = async ({ id }) => {
  const { data } = await publicAxios.get(`/volunteer-work/${id}`);
  return data.result;
};

/**
 * 봉사활동을 신청합니다.
 * @typedef {Object} PostVolunteerWorkRequest
 * @property {string} id 봉사활동 ID
 *
 * @param {PostVolunteerWorkRequest}
 * @returns {Promise<undefined>}
 */
export const requestVolunteerWork = async ({ id }) => {
  const { data } = await authAxios.post(`/volunteer-work/${id}`);
  return data.result;
};

/**
 * @typedef {Object} Tag
 * @property {number} id - 태그 ID
 * @property {string} title - 태그 제목
 */

/**
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
