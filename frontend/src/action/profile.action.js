import profileService from "../api/profile.service.js";

export async function profileAction({ request }) {

    const formData = await request.formData();

    const addresses = JSON.parse(
        formData.get("addresses") || "[]"
    );

    const profile = {

        name: formData.get("name"),

        email: formData.get("email"),

        mobileNumber: formData.get("mobileNumber"),

        addresses: addresses

    };

    try {

        const response =
            await profileService.updateProfile(profile);

        return {

            success: true,

            profileData: response.data

        };

    } catch (e) {

        if (e.response?.status === 400) {

            return {

                success: false,

                errors: e.response.data

            };

        }

        throw e;

    }

}