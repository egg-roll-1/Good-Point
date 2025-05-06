import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api/api';

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
