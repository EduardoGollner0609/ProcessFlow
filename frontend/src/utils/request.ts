import axios, { AxiosRequestConfig } from "axios";
import * as authService from '../services/auth-service';
import { BASE_URL } from "./system";

export function requestBackend(config: AxiosRequestConfig) {
    const token = authService.getToken();
console.log(token)
    const headers = token
        ? { ...config.headers, Authorization: `Bearer ${token}` }
        : config.headers;


    return axios({ ...config, baseURL: BASE_URL, headers });
}

axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {

        return Promise.reject(error);
    }
);