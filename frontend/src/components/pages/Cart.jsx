import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useContext,
    useMemo,
    useState
} from "react";

import PageTitle from "../../components/pages/PageTitle";
import CartTable from "./CartTable.jsx";
import AddressTable from "./AddressTable.jsx";
import useCart from "../../store/hooks/UseCart";

import { AuthContext } from "../../store/contexts/AuthContext.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";


const Cart = () => {

    const { cart } = useCart();

    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);

    const isCartEmpty = useMemo(() => {
        return cart.length === 0;
    }, [cart.length]);


    /*
     * Addresses now come from AuthContext.
     *
     * They are populated:
     * - after login
     * - after profile update
     */
    const addresses =
        authState.user?.addressList || [];


    const [
        selectedAddressId,
        setSelectedAddressId
    ] = useState(null);


    /*
     * Checkout is allowed only when:
     *
     * 1. There is at least one address
     * 2. User has selected an address
     * 3. Selected address still exists
     */
    const selectedAddress = useMemo(() => {

        return addresses.find(
            address =>
                address.id === selectedAddressId
        );

    }, [addresses, selectedAddressId]);


    const hasValidShippingAddress =
        !!selectedAddress;


    const handleCheckout = () => {

        if (!hasValidShippingAddress) {
            return;
        }

        navigate("/checkout", {
            state: {
                selectedAddressId
            }
        });
    };


    return (
        <div className="max-w-5xl mx-auto px-6 py-14">

            <PageTitle title="Your Cart"/>


            {!isCartEmpty ? (

                <>

                    {/* Products */}

                    <CartTable/>


                    {/* Shipping Address */}

                    <div className="mt-8">

                        <AddressTable
                            addresses={addresses}
                            selectedAddressId={selectedAddressId}
                            onAddressChange={setSelectedAddressId}
                        />

                    </div>


                    {/* Checkout validation */}

                    {!hasValidShippingAddress && (

                        <div
                            className="
                                mt-4
                                rounded-xl
                                border
                                border-amber-300
                                bg-amber-50
                                px-5
                                py-4
                                text-amber-800
                                dark:border-amber-700
                                dark:bg-amber-900/20
                                dark:text-amber-300
                            "
                        >

                            {addresses.length === 0 ? (

                                <p>
                                    Please add a shipping address
                                    before proceeding to checkout.
                                </p>

                            ) : (

                                <p>
                                    Please select a shipping address
                                    before proceeding to checkout.
                                </p>

                            )}

                        </div>

                    )}


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


                        <button
                            type="button"
                            onClick={handleCheckout}
                            disabled={!hasValidShippingAddress}
                            className={`
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                transition

                                ${
                                hasValidShippingAddress
                                    ? `
                                            bg-primary
                                            text-white
                                            hover:opacity-90
                                        `
                                    : `
                                            cursor-not-allowed
                                            bg-gray-300
                                            text-gray-500
                                            dark:bg-gray-700
                                            dark:text-gray-400
                                        `
                            }
                            `}
                        >
                            Proceed To Checkout
                        </button>

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

            )}

        </div>
    );
};


export default Cart;