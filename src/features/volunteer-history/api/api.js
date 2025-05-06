import { authAxios } from '../../auth/config/axios';
import { VolunteerHistory } from './model';

/**
 * 봉사활동 신청내역을 가져옵니다.
 * @returns {Promise<VolunteerHistory[]>}
 */
export const getVolunteerHistory = async () => {
  const { data } = await authAxios.get('/volunteer-history');
  return data.result;
};
