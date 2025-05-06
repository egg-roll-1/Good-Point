import { publicAxios } from '../../auth/config/axios';
import * as Model from './model';

/**
 * 회원가입 요청
 * @typedef {Object} SignUpRequest
 * @property {string} phoneNumber
 * @property {string} password
 * @property {string} name
 * @property {number} age
 * @property {'M' | 'F'} gender
 *
 * @param {SignUpRequest}
 * @returns {Promise<Model.LoginResponse>}
 */
export const signUp = async (request) => {
  const { data } = await publicAxios.post('/auth/signup', request);
  return data.result;
};

/**
 * 로그인 요청
 * @typedef {Object} SignInRequest
 * @property {string} phoneNumber
 * @property {string} password
 *
 * @param {SignInRequest}
 * @returns {Promise<Model.LoginResponse>}
 */
export const signIn = async (request) => {
  const { data } = await publicAxios.post('/auth/login', request);
  return data.result;
};
