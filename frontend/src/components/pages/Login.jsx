import {Form, Link, useActionData, useNavigate, useNavigation} from "react-router-dom";

import {useEffect, useRef} from "react";

import PageTitle from "../../components/pages/PageTitle";
import useAuth from "../../store/hooks/UseAuth.jsx";

const inputStyle = `
    w-full
    rounded-xl
    border
    border-primary/30
    bg-light
    dark:bg-[#23271F]
    px-4
    py-3
    text-dark
    dark:text-light
    placeholder:text-primary/60
    transition-all
    duration-300
    focus:border-primary
    focus:ring-2
    focus:ring-primary/30
    focus:outline-none
`;

const Login = () => {

    const formRef = useRef(null);

    const actionData = useActionData();

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    const navigate = useNavigate();

    const {loginSuccess} = useAuth();

    const hasLoggedIn = useRef(false);

    useEffect(() => {

        if (!actionData?.success) return;

        if (hasLoggedIn.current) return;

        hasLoggedIn.current = true;

        loginSuccess(
            actionData.token,
            actionData.user
        );

        formRef.current?.reset();

        const from =
            sessionStorage.getItem("redirectPath") || "/";

        sessionStorage.removeItem("redirectPath");

        navigate(from);

    }, [actionData]);


    return (

        <div className="max-w-lg mx-auto px-6 py-16">

            <PageTitle title="Login"/>

            <Form
                ref={formRef}
                method="post"
                className="
                    mt-12
                    rounded-3xl
                    border
                    border-primary/20
                    bg-light
                    dark:bg-[#3F433B]
                    p-8
                    shadow-xl
                    transition-colors
                    duration-300
                    space-y-6
                "
            >

                {/* Success Message */}

                {actionData?.success && (
                    <div
                        className="
                            rounded-lg
                            bg-green-100
                            text-green-700
                            px-4
                            py-3
                        "
                    >
                        {actionData.message}
                    </div>
                )}

                {/* Error Message */}

                {!actionData?.success && actionData?.message && (
                    <div
                        className="
                            rounded-lg
                            bg-red-100
                            text-red-700
                            px-4
                            py-3
                        "
                    >
                        {actionData.message}
                    </div>
                )}

                <div>

                    <label
                        className="
                            mb-2
                            block
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Username
                    </label>

                    <input
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        autoComplete="username"
                        className={inputStyle}
                        minLength={4}
                        maxLength={30}
                        required
                    />

                </div>

                <div>

                    <label
                        className="
                            mb-2
                            block
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Password
                    </label>

                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className={inputStyle}
                        minLength={6}
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        w-full
                        rounded-xl
                        bg-primary
                        py-3
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-dark
                        dark:hover:bg-[#5D764C]
                        hover:shadow-lg
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                    "
                >
                    {isSubmitting
                        ? "Authenticating..."
                        : "Login"}
                </button>

                <p
                    className="
                        text-center
                        text-dark/70
                        dark:text-light/70
                    "
                >
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                            font-semibold
                            text-primary
                            transition-colors
                            duration-300
                            hover:text-dark
                            dark:hover:text-light
                        "
                    >
                        Register Here
                    </Link>

                </p>

            </Form>

        </div>

    );

};

export default Login;