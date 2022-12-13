import axios from 'axios';
import { AxiosError } from 'axios';
import Storage from '../storage/storage';
import CookieStorage from '../storage/cookie';

const { VITE_SERVER_URL } = import.meta.env;

const customAxios = axios.create({
  baseURL: VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

customAxios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    throw new Error('Requset Error');
  },
);

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status >= 400 && error.response.status < 500) {
      const { statusText, data } = error.response;
      const { message } = data;
      if (statusText === 'Unauthorized') {
        if (
          message ===
          '유효기간이 만료된 리프레시 토큰입니다. 유저를 로그인 화면으로 보내주세요'
        ) {
          Storage.clearToken();
          CookieStorage.clearToken();
          window.location.replace('/login');
        }
        (async () => {
          const res = await customAxios.put(
            'auth/validation/refresh-token',
            { userId: Storage.getUserId() },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CookieStorage.getToken()}`,
              },
            },
          );
          const { result } = res.data;

          Storage.setToken(result.accessToken);
          if (CookieStorage.getToken() !== null) {
            CookieStorage.setToken(result.refreshToken);
          }
        })();
      } else if (
        message ===
          '서버에 저장되지 않은 리프레시 토큰입니다. 로그인 화면으로' ||
        message === '손상된 토큰입니다.'
      ) {
        Storage.clearToken();
        CookieStorage.clearToken();
        window.location.replace('/login');
      }

      return Promise.reject(error);
    } else if (error.response.status >= 500) {
      return AxiosError;
    }
  },
);

export default customAxios;
