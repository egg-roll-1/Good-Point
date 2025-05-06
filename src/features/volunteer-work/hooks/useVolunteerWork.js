import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PagingResponse } from '../../common/model';
import {
  getVolunteerWorkDetail,
  GetVolunteerWorkDetailRequest,
  getVolunteerWorkList,
  GetVolunteerWorkRequest,
} from '../api/api';
import { VolunteerWork } from '../api/model';

/**
 * 봉사활동 키
 */
export const volunteerWorkKeys = {
  all: ['volunteer-work'],
  list: (request) => [...volunteerWorkKeys.all, 'list', request],
  detail: (request) => [...volunteerWorkKeys.all, 'detail', request],
};

/**
 * 봉사활동 목록 데이터를 가져옵니다.
 * @param {GetVolunteerWorkRequest} request
 * @returns {UseQueryResult<PagingResponse<VolunteerWork[]>>}
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
 * @returns {UseQueryResult<VolunteerWork>}
 */
export const useVolunteerWorkDetail = (request) => {
  return useQuery({
    queryKey: volunteerWorkKeys.detail(request),
    queryFn: () => getVolunteerWorkDetail(request),
  });
};
