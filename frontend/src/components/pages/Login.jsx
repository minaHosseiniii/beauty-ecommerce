import { Link } from "react-router-dom";
import PageTitle from "../../components/pages/PageTitle";

const inputStyle = `
    w-full
    px-4
    py-3
    rounded-xl
    border
    border-gray-300
    dark:border-gray-700
    bg-white
    dark:bg-dark
    text-dark
    dark:text-light
    placeholder:text-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-primary
`;

const Login = () => {
    return (
        <div className="max-w-lg mx-auto px-6 py-14">
            <PageTitle title="Login" />

            <form
                className="
                    mt-12
                    bg-white
                    dark:bg-dark
                    rounded-3xl
                    shadow-lg
                    p-8
                    border
                    border-gray-100
                    dark:border-gray-700
                    space-y-6
                "
            >
                <div>
                    <label
                        className="
                            block
                            mb-2
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        className={inputStyle}
                        minLength={4}
                        maxLength={30}
                        required
                    />
                </div>

                <div>
                    <label
                        className="
                            block
                            mb-2
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className={inputStyle}
                        minLength={6}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="
                        w-full
                        py-3
                        rounded-xl
                        bg-primary
                        text-white
                        font-semibold
                        hover:opacity-90
                        transition
                        cursor-pointer
                    "
                >
                    Login
                </button>

                <p
                    className="
                        text-center
                        text-gray-600
                        dark:text-gray-300
                    "
                >
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="
                            text-primary
                            font-semibold
                            hover:underline
                        "
                    >
                        Register Here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;