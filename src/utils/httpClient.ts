import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import qs from 'qs';

import { API_HOST } from '../configs/vars';
import { camelizeKeys } from '../utils/stringHelper';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
  'X-org-slug': 'baseline',
};

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const localStorageValue = localStorage.getItem('persist:root');

    if (!localStorageValue) {
      return config;
    }

    const localStorageTokenObj = JSON.parse(localStorageValue);

    if (!localStorageTokenObj || !localStorageTokenObj.auth) {
      return config;
    }

    const {
      token: { tokenType, accessToken },
    } = JSON.parse(localStorageTokenObj.auth);

    if (!tokenType || !accessToken) {
      return config;
    }

    config.headers.Authorization = `${tokenType} ${accessToken}`;
    return config;
  } catch (error) {
    throw new Error(error);
  }
};

class HttpClient {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  private handleError(error: AxiosError) {
    const status = error.response?.status;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }

  initHttp() {
    const http = axios.create({
      baseURL: API_HOST,
      headers,
      withCredentials: false,
      paramsSerializer: (params) => qs.stringify(params, { indices: false }),
    });

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response: AxiosResponse) => {
        response.data = camelizeKeys(response.data);
        return response;
      },
      (error: AxiosError) => this.handleError(error)
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }
}

export const httpClient = new HttpClient();
