import apiClient from "./api-client.js";

const API = "/auth/login";

const authService = {
    login(loginRequest) {
        return apiClient.post(API, loginRequest);

    }
}

export default authService;