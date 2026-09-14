import {Link} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";

import PageTitle from "../../components/pages/PageTitle";
import CartTable from "./CartTable.jsx";
import AddressTable from "./AddressTable.jsx";
import useCart from "../../store/hooks/UseCart";

import profileService from "../../api/profile.service.js";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
    const {cart} = useCart();

    const isCartEmpty = useMemo(() => {
        return cart.length === 0;
    }, [cart.length]);

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const response = await profileService.getProfile();

                console.log(
                    "PROFILE RESPONSE:",
                    response.data
                );

                setAddresses(
                    response.data?.addressList || []
                );

            } catch (error) {
                console.error(
                    "Failed to load addresses:",
                    error
                );

            } finally {
                setIsLoadingAddresses(false);
            }
        };

        loadAddresses();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-6 py-14">

            <PageTitle title="Your Cart"/>

            {
                !isCartEmpty ? (

                    <>
                        {/* Products */}

                        <CartTable/>


                        {/* Shipping Address */}

                        <div className="mt-8">

                            <AddressTable
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onAddressChange={setSelectedAddressId}
                                isLoading={isLoadingAddresses}
                            />

                        </div>


                        {/* Actions */}

                        <div className="flex justify-between mt-8">

                            <Link
                                to="/"
                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    border
                                    border-primary
                                    text-primary
                                    font-semibold
                                    hover:bg-primary
                                    hover:text-white
                                    transition
                                "
                            >
                                Back To Products
                            </Link>


                            <Link
                                to="/checkout"
                                state={{
                                    selectedAddressId
                                }}
                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-primary
                                    text-white
                                    font-semibold
                                    hover:opacity-90
                                    transition
                                "
                            >
                                Proceed To Checkout
                            </Link>

                        </div>

                    </>

                ) : (

                    <div
                        className="
                            mt-14
                            bg-white
                            dark:bg-dark
                            rounded-3xl
                            shadow-lg
                            border
                            border-gray-100
                            dark:border-gray-700
                            p-10
                            text-center
                        "
                    >

                        <div
                            className="
                                w-28
                                h-28
                                mx-auto
                                mb-8
                                rounded-full
                                bg-primary/10
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <FontAwesomeIcon
                                icon={faShoppingBasket}
                                className="
                                    text-5xl
                                    text-primary
                                "
                            />
                        </div>


                        <h2
                            className="
                                text-3xl
                                font-bold
                                text-dark
                                dark:text-light
                                mb-4
                            "
                        >
                            Oops! Your Cart is Empty
                        </h2>


                        <p
                            className="
                                text-gray-600
                                dark:text-gray-300
                                max-w-lg
                                mx-auto
                                leading-7
                                mb-8
                            "
                        >
                            Looks like you haven't added any beauty
                            products yet. Explore our collection and
                            discover skincare essentials you'll love.
                        </p>


                        <Link
                            to="/"
                            className="
                                inline-block
                                px-8
                                py-3
                                rounded-xl
                                bg-primary
                                text-white
                                font-semibold
                                hover:opacity-90
                                transition
                            "
                        >
                            Back To Products
                        </Link>

                    </div>

                )
            }

        </div>
    );
};

export default Cart;