import { useQuery } from '@tanstack/react-query';
import { getVolunteerHistory } from '../api/api';
import { errorHandler } from '../../common/errorHandler';

export const volunteerHistoryKeys = {
  all: ['volunteer-history'],
  list: () => [...volunteerHistoryKeys.all, 'list'],
};

/**
 * 봉사내역을 조회합니다.
 * @returns {Object} React Query 객체
 */
export const useVolunteerHistory = () => {
  return useQuery({
    onError: errorHandler,
    queryKey: volunteerHistoryKeys.list(),
    queryFn: getVolunteerHistory,
    staleTime: 5 * 60 * 1000, // 5분 캐시
  });
};
