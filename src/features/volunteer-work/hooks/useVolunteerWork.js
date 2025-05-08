import { useQuery } from '@tanstack/react-query';
import {
  getVolunteerWorkDetail,
  getVolunteerWorkList,
  getVolunteerWorkListByGeometry,
} from '../api/api';

import * as RequestModel from '../api/api';

export const volunteerWorkKeys = {
  all: ['volunteer-work'],
  list: (request) => [...volunteerWorkKeys.all, 'list', request],
  geometry: (request) => [...volunteerWorkKeys.all, 'geometry', request],
  detail: (request) => [...volunteerWorkKeys.all, 'detail', request],
};

/**
 * 봉사활동 목록 데이터를 가져옵니다.
 * @param {RequestModel.GetVolunteerWorkRequest} request
 */
export const useVolunteerWork = (request) => {
  return useQuery({
    queryKey: volunteerWorkKeys.list(request),
    queryFn: () => getVolunteerWorkList(request),
  });
};

/**
 * 위치기반으로 봉사활동 목록 데이터를 가져옵니다.
 * @param {RequestModel.GetVolunteerWorkRequestByGeometry} request
 */
export const useVolunteerWorkByGeometry = (request) => {
  return useQuery({
    queryKey: volunteerWorkKeys.geometry(request),
    queryFn: () => getVolunteerWorkListByGeometry(request),
  });
};

/**
 * 봉사활동 상세 데이터를 가져옵니다.
 * @param {RequestModel.GetVolunteerWorkDetailRequest} request
 */
export const useVolunteerWorkDetail = (request) => {
  return useQuery({
    queryKey: volunteerWorkKeys.detail(request),
    queryFn: () => getVolunteerWorkDetail(request),
  });
};
