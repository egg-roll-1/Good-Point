import axios from 'axios';
import { BASE_URL } from '../../../../env';

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const authAxios = axios.create({
  baseURL: BASE_URL,
});
