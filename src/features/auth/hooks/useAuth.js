import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../constants/routes';
import { signIn, signUp, signOut } from '../api/api'; // signOut 추가
import { errorHandler } from '../../common/errorHandler';
/** import { LoginResponse } from '../api/model'; **/

export const rememberKey = 'GP:REMEMBER';
export const accessTokenKey = 'GP:ACCESS';
export const accessTokenExpireKey = 'GP:ACCESS:EXPIRE';

/**
 * 로그인 이후 처리를 수행합니다.
 * @param {LoginResponse} response
 * @returns
 */
const afterLoginAction = (response) => {
  localStorage.setItem(accessTokenKey, response.accessToken);
  localStorage.setItem(accessTokenExpireKey, response.accessTokenExpireKey);

  const to = localStorage.getItem(rememberKey) ?? '/';
  localStorage.removeItem(rememberKey); // 중복 제거 수정

  return to;
};

/**
 * 로그아웃 이후 처리를 수행합니다.
 */
const afterLogoutAction = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(accessTokenExpireKey);
  localStorage.removeItem(rememberKey);
};

/**
 * 회원가입
 */
export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onError: errorHandler,
    onSuccess: (response) => {
      const to = afterLoginAction(response);
      navigate(to, { replace: true });
    },
  });
};

/**
 * 로그인
 */
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signIn,
    onError: errorHandler,
    onSuccess: (response) => {
      const to = afterLoginAction(response);
      navigate(to, { replace: true });
    },
  });
};

/**
 * 로그아웃
 */
export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut, // LogOut -> signOut으로 수정
    onSuccess: () => {
      afterLogoutAction();
      navigate(routes.login, { replace: true });
    },
  });
};

export const useAuthGuard = (redirect = true) => {
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem(accessTokenKey);
  const expiredAt = localStorage.getItem(accessTokenExpireKey);

  const doRedirect = () => {
    // 현재 위치를 기억합니다.
    localStorage.setItem(rememberKey, location.pathname);

    // 로그인으로 이동시킵니다.
    navigate(routes.login);
  };

  // 세션이 없는 경우, 로그인 화면으로 이동시킵니다.
  if (!accessToken || !expiredAt || new Date(expiredAt) <= new Date()) {
    if (redirect) {
      doRedirect();
    }

    return false;
  }

  return true;
};
