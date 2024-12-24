// axios
import axios from 'axios'
import Cookie from "js-cookie"
// require('dotenv').config();

const domain = `${window.location.protocol}//${window.location.hostname}:8000/api/v1`

const axiosInstance =  axios.create({
  baseURL: domain,
  headers: {
    'content-type': 'application/json',
    'accept'      : 'application/json',
    'Access-Control-Allow-Origin' : "*",
  }
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookie.get("token")
      const auth = token ? `Bearer ${token}` : '';
      config.headers.common['Authorization'] = auth;
      return config;
    },
    (error) => Promise.reject(error),
  );

export default axiosInstance;
