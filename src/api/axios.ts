import axios, { AxiosResponse } from 'axios';
import environment from 'environments/environment';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  timeout: 60000
});

// const pendingMap = new Map();
// const CancelToken = axios.CancelToken;

// const removePending = (config: AxiosRequestConfig) => {
//   const key = config.url + '&' + config.method;
//   const cancel = pendingMap.get(key);
//   if (cancel) {
//     cancel();
//     pendingMap.delete(key);
//   }
// };

// axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
//   removePending(config);
//   config.cancelToken = new CancelToken(c => {
//     const key = config.url + '&' + config.method;
//     pendingMap.set(key, c);
//   });
//   return config;
// });

axiosInstance.interceptors.response.use(
  function(response: AxiosResponse) {
    // removePending(response.config);
    return response;
  },
  function(error) {
    message.error('请求出错，请稍后再试');
    return Promise.reject(error);
  }
);

export default axiosInstance;
