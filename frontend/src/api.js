import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Set a default timeout
  headers: {
    'Content-Type':'application/json',
  },
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('access_token');
  if(access_token){
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
}  
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  async(error) => {
    const orignalRequest = error.config;

    if (error.response.status == 401 && !orignalRequest._retry) {
      orignalRequest._retry=true;
    

    try {
      const refresh_token = localStorage.getItem('refresh_token');
      if(!refresh_token)
      {
        localStorage.clear();
        window.location.href = "/login";
        throw new Error("No refresh token available");
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/buyer/token/refresh/}`,{"refresh":refresh_token});

      const newAccessToken = response.data.access_token;
      localStorage.setItem('access_token',newAccessToken);

      orignalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(orignalRequest);
    }
    catch(refreshError){
        localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }
  // Return all other errors (404, 500, etc.) without logging out
    return Promise.reject(error);
}
);
//export api

export default api;
