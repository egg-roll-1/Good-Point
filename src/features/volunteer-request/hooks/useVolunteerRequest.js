import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestVolunteerWork, cancelVolunteerRequest, getVolunteerRequestList } from '../api/api';
import { errorHandler } from '../../common/errorHandler';

export const volunteerRequestKeys = {
  all: ['volunteer-request'],
  list: () => [...volunteerRequestKeys.all, 'list'],
};

/**
 * 봉사신청내역을 조회합니다.
 */
export const useVolunteerRequest = () => {
  return useQuery({
    onError: errorHandler,
    queryKey: volunteerRequestKeys.list(),
    queryFn: () => getVolunteerRequestList(),
  });
};

/**
 * 봉사활동을 취소합니다.
 */
export const useVolunteerWorkCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelVolunteerRequest,
    onError: errorHandler,
    onSuccess: async () => {
      queryClient.invalidateQueries(volunteerRequestKeys.list());
    },
  });
};

/**
 * 봉사활동을 신청합니다.
 */
export const useVolunteerWorkRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestVolunteerWork,
    onError: errorHandler,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: volunteerRequestKeys.list() });
    },
  });
};
