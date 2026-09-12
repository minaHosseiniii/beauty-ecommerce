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


    const handlePersonalChange = (e) => {

        const { name, value } = e.target;

        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const handleAddressChange = (index, e) => {

        const { name, value } = e.target;

        setProfileData(prev => {

            const updatedAddresses = [
                ...(prev.addressList || [])
            ];

            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [name]: value
            };

            return {
                ...prev,
                addressList: updatedAddresses
            };

        });

    };


    const handleAddAddress = () => {

        setProfileData(prev => ({

            ...prev,

            addressList: [
                ...(prev.addressList || []),

                {
                    id: null,
                    street: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: ""
                }
            ]

        }));

    };


    const handleRemoveAddress = (index) => {

        setProfileData(prev => {

            const updatedAddresses = [
                ...(prev.addressList || [])
            ];

            updatedAddresses.splice(index, 1);

            return {
                ...prev,
                addressList: updatedAddresses
            };

        });

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

                {/*
                    ProfileRequestDTO expects "addresses".
                    The response uses "addressList".
                */}
                <input
                    type="hidden"
                    name="addresses"
                    value={JSON.stringify(
                        profileData.addressList || []
                    )}
                />


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

                    {/* Personal Details */}

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
                                    value={
                                        profileData.name || ""
                                    }
                                    onChange={handlePersonalChange}
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
                                    value={
                                        profileData.email || ""
                                    }
                                    onChange={handlePersonalChange}
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
                                    value={
                                        profileData.mobileNumber || ""
                                    }
                                    onChange={handlePersonalChange}
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


                    {/* Address Details */}

                    <section>

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                mb-6
                            "
                        >

                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                "
                            >
                                Address Details
                            </h2>


                            <button
                                type="button"
                                onClick={handleAddAddress}
                                className="
                                    bg-primary
                                    text-white
                                    px-4
                                    py-2
                                    rounded-xl
                                    hover:opacity-90
                                "
                            >
                                + Add Address
                            </button>

                        </div>


                        {(profileData.addressList || []).length === 0 && (

                            <div
                                className="
                                    border
                                    border-dashed
                                    border-stone-300
                                    dark:border-[#2B3328]
                                    rounded-2xl
                                    p-8
                                    text-center
                                    text-stone-500
                                    dark:text-stone-400
                                "
                            >
                                <p className="mb-4">
                                    You don't have any addresses yet.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleAddAddress}
                                    className="
                                        bg-primary
                                        text-white
                                        px-5
                                        py-2
                                        rounded-xl
                                        hover:opacity-90
                                    "
                                >
                                    Add your first address
                                </button>

                            </div>

                        )}


                        {(profileData.addressList || []).map(
                            (address, index) => (

                                <div
                                    key={address.id ?? index}
                                    className="
                                        border
                                        border-stone-200
                                        dark:border-[#2B3328]
                                        rounded-2xl
                                        p-6
                                        mb-6
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            mb-5
                                        "
                                    >

                                        <h3
                                            className="
                                                font-semibold
                                            "
                                        >
                                            Address {index + 1}
                                        </h3>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveAddress(index)
                                            }
                                            className="
                                                text-red-500
                                                text-sm
                                                hover:underline
                                            "
                                        >
                                            Remove
                                        </button>

                                    </div>


                                    <div
                                        className="
                                            grid
                                            md:grid-cols-2
                                            gap-6
                                        "
                                    >

                                        {/* Street */}

                                        <div>

                                            <label>Street</label>

                                            <input
                                                type="text"
                                                name="street"
                                                value={
                                                    address.street || ""
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>


                                        {/* City */}

                                        <div>

                                            <label>City</label>

                                            <input
                                                type="text"
                                                name="city"
                                                value={
                                                    address.city || ""
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>


                                        {/* State */}

                                        <div>

                                            <label>State</label>

                                            <input
                                                type="text"
                                                name="state"
                                                value={
                                                    address.state || ""
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>


                                        {/* Postal Code */}

                                        <div>

                                            <label>Postal Code</label>

                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={
                                                    address.postalCode || ""
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>


                                        {/* Country */}

                                        <div className="md:col-span-2">

                                            <label>Country</label>

                                            <input
                                                type="text"
                                                name="country"
                                                value={
                                                    address.country || ""
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </section>


                    {/* Save */}

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