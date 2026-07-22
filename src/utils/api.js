import axios from "axios";

const api = axios.create({
  // Use the same domain as the frontend.
  // Nginx will proxy /api to the backend container.
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api/contact",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export const contactService = {
  submit: (data) => api.post("/", data),
};

export default api;
