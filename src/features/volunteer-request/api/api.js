import { authAxios } from '../../auth/config/axios';
import * as Types from './model';

/**
 * 봉사활동 신청내역을 가져옵니다.
 * @returns {Promise<Types.VolunteerRequest[]>}
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
