import { Link } from "react-router-dom";
import PageTitle from "../../components/pages/PageTitle";

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
    return (
        <div className="max-w-lg mx-auto px-6 py-16">

            <PageTitle title="Login" />

            <form
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
                        cursor-pointer
                    "
                >
                    Login
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

            </form>

        </div>
    );
};

export default Login;