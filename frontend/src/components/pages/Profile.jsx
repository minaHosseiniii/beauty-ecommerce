import { useEffect, useState } from "react";

import {
    Form,
    useLoaderData,
    useActionData,
    useNavigation
} from "react-router-dom";

const Profile = () => {

    const initialProfileData = useLoaderData();

    const actionData = useActionData();

    const navigation = useNavigation();

    const isSubmitting =
        navigation.state === "submitting";

    const [profileData, setProfileData] =
        useState(initialProfileData);

    const [errors, setErrors] =
        useState({});

    useEffect(() => {

        if (!actionData) return;

        if (actionData.success) {

            setProfileData(actionData.profileData);

            setErrors({});

        } else {

            setErrors(actionData.errors || {});

        }

    }, [actionData]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const inputClass = `
        w-full
        rounded-xl
        border
        border-stone-300
        dark:border-[#2B3328]
        bg-white
        dark:bg-[#1F241D]
        px-4
        py-3
        outline-none
        focus:border-primary
    `;

    const errorClass =
        "text-red-500 text-sm mt-1";

    return (

        <div className="max-w-4xl mx-auto py-10 px-6">

            <h1
                className="
                    text-3xl
                    font-bold
                    mb-8
                "
            >
                My Profile
            </h1>

            <Form method="put">

                <div
                    className="
                        bg-white
                        dark:bg-[#171A16]
                        rounded-2xl
                        shadow-md
                        p-8
                        space-y-8
                    "
                >

                    <section>

                        <h2
                            className="
                                text-xl
                                font-semibold
                                mb-6
                            "
                        >
                            Personal Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                                {errors.name &&
                                    <p className={errorClass}>
                                        {errors.name}
                                    </p>
                                }

                            </div>

                            <div>

                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                                {errors.email &&
                                    <p className={errorClass}>
                                        {errors.email}
                                    </p>
                                }

                            </div>

                            <div>

                                <label>Mobile Number</label>

                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={profileData.mobileNumber || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                                {errors.mobileNumber &&
                                    <p className={errorClass}>
                                        {errors.mobileNumber}
                                    </p>
                                }

                            </div>

                        </div>

                    </section>

                    <section>

                        <h2
                            className="
                                text-xl
                                font-semibold
                                mb-6
                            "
                        >
                            Address Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label>Street</label>

                                <input
                                    type="text"
                                    name="street"
                                    value={profileData.street || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                            </div>

                            <div>

                                <label>City</label>

                                <input
                                    type="text"
                                    name="city"
                                    value={profileData.city || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                            </div>

                            <div>

                                <label>State</label>

                                <input
                                    type="text"
                                    name="state"
                                    value={profileData.state || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                            </div>

                            <div>

                                <label>Postal Code</label>

                                <input
                                    type="text"
                                    name="postalCode"
                                    value={profileData.postalCode || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                            </div>

                            <div className="md:col-span-2">

                                <label>Country</label>

                                <input
                                    type="text"
                                    name="country"
                                    value={profileData.country || ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                            </div>

                        </div>

                    </section>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                            bg-primary
                            text-white
                            px-8
                            py-3
                            rounded-xl
                            hover:opacity-90
                            disabled:opacity-50
                        "
                    >

                        {isSubmitting
                            ? "Saving..."
                            : "Save"}

                    </button>

                </div>

            </Form>

        </div>

    );

};

export default Profile;