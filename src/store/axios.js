import axios from 'axios';
import { notification } from 'antd';
import history from '../common/history';
import Utils from '../common/utils';

const instanceApi = axios.create({
   withCredentials: true,
   baseURL: 'https://front.behbudov.com/api',
});

instanceApi.interceptors.request.use(config => {
   if (Utils.getAccessToken()) {
      config.headers.Authorization = `Bearer ${Utils.getAccessToken()}`;
   }
   return config;
});

instanceApi.interceptors.response.use(
   config => {
      config?.data?.message &&
         notification.success({
            message: config.data.message,
            placement: 'bottomRight',
         });
      return config;
   },
   async err => {
      const originalRequest = err?.config;
      if (err?.response) {
         if (err.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
               const response = await axios.get('https://front.behbudov.com/api/auth/refresh', {
                  withCredentials: true,
               });
               Utils.setAccessToken(response.data.accessToken);
               originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
               return axios(originalRequest);
            } catch (e) {
               Utils.removeAccessToken();
               window.store.dispatch({ type: 'logOut' });
               history.push('/login');
               notification.error({
                  message: err.response.data?.message,
                  placement: 'bottomRight',
               });
            }
         } else {
            notification.error({
               message: err.response.data?.message || `${err.response.status}: ${err.response.statusText}`,
            });
         }
      } else {
         notification.error({
            message: err.message,
         });
      }

      throw err;
   },
);

export default instanceApi;
