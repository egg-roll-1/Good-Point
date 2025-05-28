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

export const changePassword = async (oldPassword, newPassword) => {
  const { data } = await authAxios.post('/auth/change-password', {
    oldPassword,
    newPassword,
  });
  return data;
};

export const deleteUser = async () => {
  const { data } = await authAxios.delete('/user');
  return data;
};
