import { useQuery } from '@tanstack/react-query';
import {
  getVolunteerWorkDetail,
  GetVolunteerWorkDetailRequest,
  getVolunteerWorkList,
  GetVolunteerWorkRequest,
} from '../api/api';

export const volunteerWorkKeys = {
  all: ['volunteer-work'],
  list: (request) => [...volunteerWorkKeys.all, 'list', request],
  detail: (request) => [...volunteerWorkKeys.all, 'detail', request],
};

/**
 * 봉사활동 목록 데이터를 가져옵니다.
 * @param {GetVolunteerWorkRequest} request
 */
export const useVolunteerWork = (request) => {
  return useQuery({
    queryKey: volunteerWorkKeys.list(request),
    queryFn: () => getVolunteerWorkList(request),
  });
};

/**
 * 봉사활동 상세 데이터를 가져옵니다.
 * @param {GetVolunteerWorkDetailRequest} request
 */
export const useVolunteerWorkDetail = (request) => {
  return useQuery({
    queryKey: volunteerWorkKeys.detail(request),
    queryFn: () => getVolunteerWorkDetail(request),
  });
};
