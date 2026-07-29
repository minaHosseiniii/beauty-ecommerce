import apiClient from "./api-client.js";

const API = "/auth";

const authService = {
    login(loginRequest) {
        return apiClient.post(`${API}/login`, loginRequest);

    },
    register(registerRequest) {
        return apiClient.post(`${API}/register`, registerRequest)
    }
}

export default authService;