import axios, { AxiosRequestConfig } from "axios";
import * as authService from '../services/auth-service';
import { BASE_URL } from "./system";
import { ValidationError } from "../models/exceptions";
import { UseFormSetError } from "react-hook-form";

export function requestBackend(config: AxiosRequestConfig) {
    const token = authService.getToken();
    console.log(token)
    const headers = token
        ? { ...config.headers, Authorization: `Bearer ${token}` }
        : config.headers;


    return axios({ ...config, baseURL: BASE_URL, headers });
}


export function backendErrorInForm(errorsResponse: ValidationError[], setError: UseFormSetError<any>) {
    errorsResponse.forEach(({ fieldName, message }) => {
        setError(fieldName, {
            message: message
        })
    });
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
        if (error.response.status === 401 || error.response.status === 403) {
            authService.removeToken()
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);