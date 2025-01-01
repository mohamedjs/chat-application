// axios
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';

const domain: string = `${process.env.NEXT_PUBLIC_APP_URL}/api`;


const axiosInstance: AxiosInstance = axios.create({
    baseURL: domain,
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});


axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token: string = Cookie.get('token') || '';
        const authToken: string = token ? `Bearer ${token}` : '';
        config.headers.Authorization = authToken;
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

export default axiosInstance