import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { cancelVolunteerRequest, getVolunteerWorkList } from '../api/api';
import { VolunteerRequest } from '../api/model';

/**
 * 봉사신청내역 키
 */
export const volunteerRequestKeys = {
  all: ['volunteer-request'],
  list: () => [...volunteerRequestKeys.all, 'list'],
};

/**
 * 봉사활동 신청내역 데이터를 가져옵니다.
 * @returns {UseQueryResult<VolunteerRequest[]>}
 */
export const useVolunteerRequest = (request) => {
  return useQuery({
    queryKey: volunteerRequestKeys.list(request),
    queryFn: () => getVolunteerWorkList(request),
  });
};

/**
 * 봉사활동을 취소합니다.
 * @returns {UseMutationResult}
 */
export const useVolunteerWorkCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelVolunteerRequest,
    onSuccess: async () => {
      queryClient.invalidateQueries(volunteerRequestKeys.list());
    },
  });
};
