import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {Alert} from 'react-native';

const APIKit = (): AxiosInstance => {
  const Kit = axios.create({
    timeout: 10000,
  });

  const responseHandler = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const errorHandler = (error: AxiosError): Promise<AxiosError> => {
    Alert.alert(
      `Error: ${error.response.status} - ${
        error.response.data.message || 'Unknown error'
      }`,
    );

    return Promise.reject(error);
  };

  Kit.interceptors.request.use(async function (
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> {
    return config;
  });

  Kit.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError) => errorHandler(error),
  );

  return Kit;
};

export default APIKit;
