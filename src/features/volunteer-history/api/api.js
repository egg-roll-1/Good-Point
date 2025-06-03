import { authAxios } from '../../auth/config/axios';
import * as Model from './model';

/**
 * 봉사활동 신청내역을 가져옵니다.
 * @returns {Promise<Model.VolunteerHistory[]>}
 */
export const getVolunteerHistory = async () => {
  try {
    const { data } = await authAxios.get('/volunteer-history');
    return data.result;
  } catch (error) {
    console.error('봉사활동 내역 조회 실패:', error);
    throw error;
  }
};
