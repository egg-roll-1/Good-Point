import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../constants/routes';
import { signIn } from '../api/api';
import * as Model from '../api/model';
import { useEffect } from 'react';

const rememberKey = 'GP:REMEMBER';
export const accessTokenKey = 'GP:ACCESS';
const accessTokenExpireKey = 'GP:ACCESS:EXPIRE';

/**
 * 로그인 이후 처리를 수행합니다.
 * @param {Model.LoginResponse} response
 * @returns
 */
const afterLoginAction = (response) => {
  localStorage.setItem(accessTokenKey, response.accessToken);
  localStorage.setItem(accessTokenExpireKey, response.accessTokenExpireKey);
  localStorage.removeItem(rememberKey);

  const to = localStorage.getItem(rememberKey) ?? '/';
  localStorage.removeItem(rememberKey);

  return to;
};

/**
 * 회원가입
 */
export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signIn,
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
    onSuccess: (response) => {
      const to = afterLoginAction(response);
      navigate(to, { replace: true });
    },
  });
};

/**
 * 로그인이 필요한 페이지에 대해 보호합니다.
 * @param {boolean} redirect 로그인이 되어있지 않은 경우, 로그인 페이지로 이동시킬지 여부. 기본값은 true.
 * @returns 로그인이 되어있다면 true, 아니라면 false
 */
export const useAuthGuard = (redirect = true) => {
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem(accessTokenKey);
  const expiredAt = localStorage.getItem(accessTokenExpireKey);

  const doRedirect = async () => {
    // 현재 위치를 기억합니다.
    localStorage.setItem(rememberKey, location.pathname);

    // 로그인으로 이동시킵니다.
    await navigate(routes.login);
  };

  useEffect(() => {
    if (!redirect) return;

    (async () => {
      // 세션이 없는 경우, 로그인 화면으로 이동시킵니다.
      if (!accessToken || !expiredAt || new Date(expiredAt) <= new Date()) {
        if (redirect) {
          await doRedirect();
        }
      }
    })();
  }, []);

  // 세션이 없는 경우, 로그인 화면으로 이동시킵니다.
  if (!accessToken || !expiredAt || new Date(expiredAt) <= new Date()) {
    return false;
  }

  return true;
};
