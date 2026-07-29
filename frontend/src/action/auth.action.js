
import authService from "../api/auth.service.js";

export async function authAction({ request }) {

    console.log("authAction called");

    const formData = await request.formData();

    console.log(formData.get("username"));
    console.log(formData.get("password"));

    const loginRequest = {
        username: formData.get("username"),
        password: formData.get("password")
    };

    console.log(loginRequest);

    try {

        console.log("before api");

        const response = await authService.login(loginRequest);

        console.log(response);

        return {
            success: true,
            token: response.data.token,
            user: response.data.user,
            message: response.data.message
        };

    } catch (e) {

        console.log(e);

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