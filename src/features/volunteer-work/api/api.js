import { authAxios, publicAxios } from '../../auth/config/axios';
import * as Model from './model';

/**
 * 봉사활동 목록을 가져옵니다.
 * @typedef {Object} GetVolunteerWorkRequest
 * @property {string} latitude 위도 - 기본값: 숭실대 위치 
 * @property {string} longitude 경도 - 기본값: 숭실대 위치
 * @property {number} distanceKm 범위 - 기본값: 10
 * @property {string} keyword 검색어
 *
 * @param {GetVolunteerWorkRequest} request
 * @returns {Promise<Model.VolunteerWork[]>}
 */
export const getVolunteerWorkList = async (request) => {
  const { data } = await publicAxios.get('/volunteer-work', {
    params: {
      ...request,
    },
  });

  return data;
};

/**
 * 봉사활동 목록을 가져옵니다.
//  * @typedef {Object} GetVolunteerWorkRequestByGeometry
//  * @property {number} latitude 위도
//  * @property {number} longitude 경도
//  * @property {number} distanceKm 범위 - 기본값: 5km
//  *
//  * @param {GetVolunteerWorkRequestByGeometry} request
//  * @returns {Promise<Model.VolunteerWork[]>}
//  */
// export const getVolunteerWorkListByGeometry = async (request) => {
//   const { data } = await publicAxios.get('/volunteer-work/geometry', {
//     params: {
//       ...request,
//     },
//   });

//   return data.result;
// };

/**
 * 봉사활동 상세를 가져옵니다.
 * @typedef {Object} GetVolunteerWorkDetailRequest
 * @property {number} id 봉사활동 ID
 *
 * @param {GetVolunteerWorkDetailRequest}
 * @returns {Promise<Model.VolunteerWorkDetail>}
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
