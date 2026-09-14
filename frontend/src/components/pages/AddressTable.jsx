const AddressTable = ({
                          addresses,
                          selectedAddressId,
                          onAddressChange,
                          isLoading,
                      }) => {

    if (isLoading) {
        return (
            <div className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-600
                dark:bg-[#353932]
            ">
                <h2 className="
                    mb-4
                    text-lg
                    font-semibold
                    text-dark
                    dark:text-light
                ">
                    Shipping Address
                </h2>

                <p className="
                    text-gray-500
                    dark:text-gray-400
                ">
                    Loading addresses...
                </p>
            </div>
        );
    }

    if (!addresses || addresses.length === 0) {
        return (
            <div className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-600
                dark:bg-[#353932]
            ">
                <h2 className="
                    mb-2
                    text-lg
                    font-semibold
                    text-dark
                    dark:text-light
                ">
                    Shipping Address
                </h2>

                <p className="
                    text-gray-500
                    dark:text-gray-400
                ">
                    No saved addresses found.
                </p>
            </div>
        );
    }

    return (
        <div className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-gray-600
            dark:bg-[#353932]
        ">

            <h2 className="
                mb-4
                text-lg
                font-semibold
                text-dark
                dark:text-light
            ">
                Shipping Address
            </h2>

            <div className="space-y-3">

                {addresses.map((address) => (

                    <label
                        key={address.id}
                        className={`
                            flex
                            cursor-pointer
                            items-start
                            gap-3
                            rounded-xl
                            border
                            p-4
                            transition
                            ${
                            selectedAddressId === address.id
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 dark:border-gray-600"
                        }
                        `}
                    >

                        <input
                            type="radio"
                            name="shippingAddress"
                            value={address.id}
                            checked={
                                selectedAddressId === address.id
                            }
                            onChange={(event) =>
                                onAddressChange(
                                    Number(event.target.value)
                                )
                            }
                            className="
                                mt-1
                                accent-primary
                            "
                        />

                        <div className="min-w-0">

                            <p className="
                                font-semibold
                                text-dark
                                dark:text-light
                            ">
                                {address.label}
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                leading-6
                                text-gray-600
                                dark:text-gray-300
                            ">
                                {address.street},{" "}
                                {address.city},{" "}
                                {address.state},{" "}
                                {address.country}
                                {" - "}
                                {address.postalCode}
                            </p>

                        </div>

                    </label>

                ))}

            </div>

        </div>
    );
};

export default AddressTable;