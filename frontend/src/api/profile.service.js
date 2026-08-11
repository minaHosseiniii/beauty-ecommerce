import apiClient from "./api-client.js";


const profileService = {

    getProfile() {
        return apiClient.get("/profile");
    },

    updateProfile(profileData) {
        return apiClient.put("/profile", profileData);
    }

};

export default profileService;