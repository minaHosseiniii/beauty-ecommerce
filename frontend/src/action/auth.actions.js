import authService from "../api/auth.service.js";

export async function authActions({ request }) {

    const formData = await request.formData();

    const loginRequest = {
        username: formData.get("username"),
        password: formData.get("password")
    };

    try {

        const response = await authService.login(loginRequest);

        return {
            success: true,
            token: response.data.token,
            user: response.data.user,
            message: response.data.message
        };

    } catch (e) {

        if (e.response?.status === 401) {
            return {
                success: false,
                message: "Invalid username or password"
            };
        }

        return {
            success: false,
            message: "Something went wrong."
        };

    }

}


export async function registerAction({ request }) {

    const formData = await request.formData();

    const registerRequest = {
        name: formData.get("name"),
        email: formData.get("email"),
        mobileNumber: formData.get("mobileNumber"),
        password: formData.get("password")
    };

    try {

        const response = await authService.register(registerRequest);

        return {
            success: true,
            message: response.data
        };

    } catch (e) {

        if (e.response?.status === 400) {

            return {
                success: false,
                errors: e.response.data
            };

        }

        return {
            success: false,
            message: "Something went wrong."
        };

    }

}