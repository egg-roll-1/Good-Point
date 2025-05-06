import { useQuery } from '@tanstack/react-query';
import { getVolunteerHistory } from '../api/api';

export const volunteerHistoryKeys = {
  all: ['volunteer-history'],
  list: (request) => [...volunteerHistoryKeys.all, 'list', request],
};

/**
 * 봉사내역을 조회합니다.
 * @returns
 */
export const useVolunteerHistory = () => {
  return useQuery({
    queryKey: volunteerHistoryKeys.list(),
    queryFn: () => getVolunteerHistory(),
  });
};
