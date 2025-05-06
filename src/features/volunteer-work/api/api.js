import { authAxios, publicAxios } from '../../auth/config/axios';
import { PagingResponse } from '../../common/model';
import { VolunteerWork } from './model';

/**
 * 봉사활동 목록을 가져옵니다.
 * @typedef {Object} GetVolunteerWorkRequest
 * @property {number} page 페이지
 * @property {number} size 크기
 * @property {string} latitude 위도
 * @property {string} longitude 경도
 *
 * @param {GetVolunteerWorkRequest} request
 * @returns {Promise<PagingResponse<VolunteerWork[]>>}
 */
export const getVolunteerWorkList = async (request) => {
  const { data } = await publicAxios.get('/volunteer-work', {
    params: {
      ...request,
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
