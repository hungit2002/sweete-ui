import axios from "axios";

const mediaAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_SERVICE_MEDIA, // Replace with your API base URL
  timeout: 10000, // Optional timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to each request
mediaAxios.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default mediaAxios;
