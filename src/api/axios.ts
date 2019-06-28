import axios, { AxiosResponse } from 'axios';
import environment from 'environments/environment';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  timeout: 5000
});

axiosInstance.interceptors.response.use(
  function(response: AxiosResponse) {
    return response;
  },
  function(error) {
    message.error('请求出错，请稍后再试');
    return Promise.reject(error);
  }
);

export default axiosInstance;
