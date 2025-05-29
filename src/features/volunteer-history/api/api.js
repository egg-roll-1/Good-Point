import { authAxios } from '../../auth/config/axios';
import * as Model from './model';

/**
 * 봉사활동 신청내역을 가져옵니다.
 * @returns {Promise<Model.VolunteerHistory[]>}
 */
export const getVolunteerHistory = async ({id}) => {
  const { data } = await authAxios.get(`/volunteer-history/${id}`);
  return data.result;
};
