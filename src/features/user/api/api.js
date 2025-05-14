import { authAxios } from '../../auth/config/axios';
//import { User } from './model';

/**
 * 사용자 프로필을 가져옵니다.
 * @returns {Promise<User>}
 */
export const getUserProfile = async () => {
  const { data } = await authAxios.get('/user');
  return data.result;
};
// 비밀번호 변경
export const updatePassword = async (newPassword) => {
  const { data } = await authAxios.patch('/user/password', { newPassword });
  return data;
};

// 회원 탈퇴
export const deleteUser = async () => {
  const { data } = await authAxios.delete('/user');
  return data;
};
