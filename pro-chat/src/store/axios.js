// axios
import axios from 'axios'
// require('dotenv').config();

const domain = "http://localhost:8000/api/v1"

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
      const token = localStorage.getItem("token")
      const auth = token ? `Bearer ${localStorage.getItem("token")}` : '';
      config.headers.common['Authorization'] = auth;
      return config;
    },
    (error) => Promise.reject(error),
  );

export default axiosInstance;
