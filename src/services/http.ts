import { AxiosRequestConfig } from "axios";
const axios = require("axios");
const apiBaseUrl = "https://httpbin.org";
export class Http {
  static post(path: string, data?: any, config?: AxiosRequestConfig) {
    return axios.post(`${apiBaseUrl}${path}`, data, config);
  }
  static get(path: string, data?: any): Promise<any> {
    return axios.get(`${apiBaseUrl}${path}`, data);
  }
  static put(path: string, data: any, config?: AxiosRequestConfig) {
    return axios.put(`${apiBaseUrl}${path}`, data);
  }

  static delete(path: string, data?: any) {
    return axios.delete(`${apiBaseUrl}${path}`, data);
  }
}
