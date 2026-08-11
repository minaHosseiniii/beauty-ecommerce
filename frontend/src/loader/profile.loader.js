import profileService from "../api/profile.service";

export async function profileLoader() {

    try {

        const response = await profileService.getProfile();

        return response.data;

    } catch (e) {

        throw e;

    }

}