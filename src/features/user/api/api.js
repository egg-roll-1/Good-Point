import { authAxios } from '../../auth/config/axios';
import { User } from './model';

/**
 * 사용자 프로필을 가져옵니다.
 * @returns {Promise<User>}
 */
export const getUserProfile = async () => {
  const { data } = await authAxios.get('/user');
  return data.result;
};
