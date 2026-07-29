
import {
    Form,
    Link,
    useActionData,
    useNavigate,
    useSubmit
} from "react-router-dom";

import {useEffect, useRef} from "react";


const Register = () => {

    const submit = useSubmit();
    const formRef = useRef(null);
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {

        if (actionData?.success) {

            formRef.current?.reset();

            navigate("/login");

        }

    }, [actionData, navigate]);

    const validatePasswords = (formData) => {

        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        return password === confirmPassword;
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        const formData = new FormData(formRef.current);

        if (!validatePasswords(formData))
            return;

        submit(formData, {
            method: "post"
        });

    };

    return (

        <div
            className="
            min-h-screen
            bg-light
            dark:bg-[#171A16]
            flex
            items-center
            justify-center
            px-6
            py-12
        "
        >

            <div
                className="
                w-full
                max-w-md
                rounded-3xl
                bg-white
                dark:bg-[#222821]
                shadow-xl
                border
                border-stone-200
                dark:border-[#31392F]
                p-8
            "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    font-primary
                    text-center
                    text-primary
                    mb-2
                "
                >
                    Create Account
                </h1>

                <p
                    className="
                    text-center
                    text-stone-500
                    dark:text-stone-400
                    mb-8
                "
                >
                    Welcome to Aura Cosmetics
                </p>

                <Form
                    method="post"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>

                        <label className="block mb-2 font-medium text-dark dark:text-stone-200">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="
                            w-full
                            rounded-xl
                            border
                            border-stone-300
                            dark:border-stone-700
                            bg-white
                            dark:bg-[#2C342A]
                            px-4
                            py-3
                            outline-none
                            focus:border-primary
                            transition
                        "
                        />

                        {actionData?.errors?.name && (

                            <p className="text-red-500 text-sm mt-1">
                                {actionData.errors.name}
                            </p>

                        )}

                    </div>

                    {/* Email */}

                    <div>

                        <label className="block mb-2 font-medium text-dark dark:text-stone-200">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#2C342A] px-4 py-3 outline-none focus:border-primary transition"
                        />

                        {actionData?.errors?.email && (

                            <p className="text-red-500 text-sm mt-1">
                                {actionData.errors.email}
                            </p>

                        )}

                    </div>

                    {/* Mobile */}

                    <div>

                        <label className="block mb-2 font-medium text-dark dark:text-stone-200">
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder="09123456789"
                            className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#2C342A] px-4 py-3 outline-none focus:border-primary transition"
                        />

                        {actionData?.errors?.mobileNumber && (

                            <p className="text-red-500 text-sm mt-1">
                                {actionData.errors.mobileNumber}
                            </p>

                        )}

                    </div>

                    {/* Password */}

                    <div>

                        <label className="block mb-2 font-medium text-dark dark:text-stone-200">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#2C342A] px-4 py-3 outline-none focus:border-primary transition"
                        />

                        {actionData?.errors?.password && (

                            <p className="text-red-500 text-sm mt-1">
                                {actionData.errors.password}
                            </p>

                        )}

                    </div>

                    {/* Confirm Password */}

                    <div>

                        <label className="block mb-2 font-medium text-dark dark:text-stone-200">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#2C342A] px-4 py-3 outline-none focus:border-primary transition"
                        />

                    </div>

                    <button
                        className="
                        w-full
                        rounded-xl
                        bg-primary
                        hover:opacity-90
                        text-white
                        py-3
                        font-semibold
                        transition
                    "
                    >
                        Register
                    </button>

                    <p
                        className="
                        text-center
                        text-sm
                        text-stone-500
                    "
                    >
                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-2 text-primary font-semibold"
                        >
                            Login
                        </Link>

                    </p>

                </Form>

            </div>

        </div>

    );

};

export default Register;