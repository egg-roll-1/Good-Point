import { authAxios } from '../../auth/config/axios';

/**
 * 사용자 프로필을 가져옵니다.
 * @returns {Promise<User>}
 */
export const getUserProfile = async () => {
  const { data } = await authAxios.get('/user');
  return data.result;
};

/**
 * @typedef {Object} User
 * @property {number} id - ID
 * @property {string} name - 이름
 * @property {string} phoneNumber - 전화번호
 * @property {'M' | 'F'} gender - 성별
 * @property {number} creditBalance - 크레딧 잔액
 */
