import { useMutation, useQuery } from '@tanstack/react-query';
import { changePassword, getUserProfile } from '../api/api';
import { errorHandler } from '../../common/errorHandler';

export const userKeys = {
  all: ['user'],
  profile: () => [...userKeys.all, 'profile'],
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => getUserProfile(),
  });
};

export const useChangePassword = () => {
  return useMutation({
    onError: errorHandler,
    mutationFn: ({ oldPassword, newPassword }) => changePassword(oldPassword, newPassword),
  });
};
