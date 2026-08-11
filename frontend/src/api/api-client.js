import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
    }
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default apiClient;