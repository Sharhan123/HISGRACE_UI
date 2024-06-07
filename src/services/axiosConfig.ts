import axios from 'axios';


const axiosWithAuth = axios.create({
  baseURL: "http://higraceapi.electromania.tech/api",
});

axiosWithAuth.interceptors.request.use(
  config => {
   
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
