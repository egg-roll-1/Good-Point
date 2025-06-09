import { useQuery } from '@tanstack/react-query';
import { getVolunteerWorkDetail, getVolunteerWorkList } from '../api/api';

import { errorHandler } from '../../common/errorHandler';
import * as RequestModel from '../api/api';

export const volunteerWorkKeys = {
  all: ['volunteer-work'],
  list: (request) => [...volunteerWorkKeys.all, 'list', request],
  detail: (request) => [...volunteerWorkKeys.all, 'detail', request],
};

/**
 * 봉사활동 목록 데이터를 가져옵니다.
 * @param {RequestModel.GetVolunteerWorkRequest} request
 */
export const useVolunteerWork = (request) => {
  const query = useQuery({
    onError: errorHandler,
    queryKey: volunteerWorkKeys.list(request),
    queryFn: () => getVolunteerWorkList(request),
    select: (data) => {
      return {
        content: data?.result || [],
        totalElements: data?.result?.length || 0,
        totalPages: 1,
        number: 0,
        size: data?.result?.length || 0,
        isFirst: true,
        isLast: true,
      };
    },
  });

  return query;
};

/**
 * 봉사활동 상세 데이터를 가져옵니다.
 * @param {RequestModel.GetVolunteerWorkDetailRequest} request
 */
export const useVolunteerWorkDetail = (request) => {
  return useQuery({
    onError: errorHandler,
    queryKey: volunteerWorkKeys.detail(request),
    queryFn: () => getVolunteerWorkDetail(request),
  });
};
