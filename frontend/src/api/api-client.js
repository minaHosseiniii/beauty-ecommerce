import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

apiClient.interceptors.request.use(async (config) => {

    // JWT
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // CSRF
    /*const safeMethods = ["GET", "HEAD", "OPTIONS"];

    if (!safeMethods.includes(config.method?.toUpperCase())) {

        let csrfToken = Cookies.get("XSRF-TOKEN");


        if (!csrfToken) {
            await apiClient.get("/csrf");

            csrfToken = Cookies.get("XSRF-TOKEN");
        }

        if (!csrfToken) {
            throw new Error("Failed to retrieve CSRF token");
        }

        config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
*/
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            const token = sessionStorage.getItem("token");

            if (token && window.location.pathname !== "/login") {
                sessionStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;