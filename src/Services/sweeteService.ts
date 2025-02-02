import axios from "axios";

const sweeteAxiosInstance = axios.create({
  baseURL: "https://sweete.id.vn", // Replace with your API base URL
  timeout: 10000, // Optional timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to each request
sweeteAxiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

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

export default sweeteAxiosInstance;
