import { authAxios } from '../../auth/config/axios';
import * as Model from './model';

/**
 * 봉사활동 신청내역을 가져옵니다.
 * @returns {Promise<Model.VolunteerRequest[]>}
 */
export const getVolunteerRequestList = async () => {
  const { data } = await authAxios.get('/volunteer-request');
  return data.result;
};

/**
 * @typedef {Object} CancelVolunteerRequest
 * @property {number} id 봉사활동 ID
 *
 * @param {CancelVolunteerRequest}
 * @returns {Promise<undefined>}
 */
export const cancelVolunteerRequest = async ({ id }) => {
  const { data } = await authAxios.delete(`/volunteer-request/${id}`);
  return data.result;
};

/**
 * @typedef {Object} VolunteerRequest
 * @property {number} id - 신청 ID
 * @property {'Wait'|'Reject'|'Approve'|'Canceled'} status - 신청 상태
 * @property {Model.VolunteerWork} volunteerWork - 봉사활동 정보
 */

/**
 * 봉사활동을 신청합니다.
 * @param {Object} params
 * @param {number} params.id - 봉사활동 ID
 * @returns {Promise<undefined>}
 */
export const requestVolunteerWork = async ({ id }) => {
  try {
    const { data } = await authAxios.post(`/volunteer-work/${id}`, {}, {
      // 빈 config 객체 명시적으로 전달
    });
    return data.result;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};