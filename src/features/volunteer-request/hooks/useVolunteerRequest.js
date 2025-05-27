import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestVolunteerWork, cancelVolunteerRequest, getVolunteerRequestList } from '../api/api';

export const volunteerRequestKeys = {
  all: ['volunteer-request'],
  list: () => [...volunteerRequestKeys.all, 'list'],
};

/**
 * 봉사신청내역을 조회합니다.
 */
export const useVolunteerRequest = () => {
  return useQuery({
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
    onSuccess: async () => {
      queryClient.invalidateQueries(volunteerRequestKeys.list());
    },
    onError: (error) => {
      console.error('봉사활동 취소 실패:', error);
    }
  });
};

/**
 * 봉사활동을 신청합니다.
 */
export const useVolunteerWorkRequest = () => {
  const queryClient = useQueryClient();
     
  return useMutation({
    mutationFn: requestVolunteerWork, 
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: volunteerRequestKeys.list() });
    }
  });
};