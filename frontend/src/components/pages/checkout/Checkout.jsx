import {
    useEffect,
    useState,
    useContext,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import UseCart from "../../../store/hooks/UseCart.jsx";
import {createPaymentIntent} from "../../../api/payment.service.js";
import {createOrder} from "../../../api/order.service.js";

import {AuthContext} from "../../../store/contexts/AuthContext.js";


const Checkout = () => {

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
    const location = useLocation();

    const {authState} = useContext(AuthContext);


    const {
        cart,
        totalPrice,
        clearCart,
    } = UseCart();


    /*
     * The selected address is passed from Cart
     * through React Router location state.
     */
    const selectedAddressId =
        location.state?.selectedAddressId ?? null;


    /*
     * Addresses are already available through AuthContext.
     *
     * They are populated:
     * - after login
     * - after profile update
     */
    const addresses =
        authState.user?.addressList || [];


    /*
     * Find the address selected in Cart.
     *
     * We do not blindly trust selectedAddressId.
     * The address must still exist in the user's
     * current addressList.
     */
    const selectedAddress = addresses.find(
        (address) =>
            address.id === selectedAddressId
    );


    const [
        isDark,
        setIsDark
    ] = useState(
        document.documentElement.classList.contains("dark")
    );


    const [
        isProcessing,
        setIsProcessing
    ] = useState(false);


    const [
        errorMessage,
        setErrorMessage
    ] = useState("");


    const [
        successMessage,
        setSuccessMessage
    ] = useState("");


    const [
        elementStates,
        setElementStates
    ] = useState({
        cardNumber: {
            complete: false,
            error: "",
        },
        cardExpiry: {
            complete: false,
            error: "",
        },
        cardCvc: {
            complete: false,
            error: "",
        },
    });


    /*
     * Checkout guard
     *
     * User must have:
     *
     * 1. A selectedAddressId
     * 2. An address matching that ID
     *
     * If the user directly opens /checkout,
     * location.state will be empty and they
     * will be redirected to Cart.
     */
    useEffect(() => {

        if (!selectedAddressId || !selectedAddress) {

            navigate("/cart", {
                replace: true,
            });

        }

    }, [
        selectedAddressId,
        selectedAddress,
        navigate,
    ]);


    /*
     * Detect dark mode changes.
     */
    useEffect(() => {

        const observer =
            new MutationObserver(() => {

                setIsDark(
                    document.documentElement.classList.contains(
                        "dark"
                    )
                );

            });


        observer.observe(
            document.documentElement,
            {
                attributes: true,
                attributeFilter: ["class"],
            }
        );


        return () => observer.disconnect();

    }, []);


    const elementOptions = {
        style: {
            base: {
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                color: isDark
                    ? "#FFFFFF"
                    : "#000000",
                fontSmoothing: "antialiased",

                "::placeholder": {
                    color: isDark
                        ? "#9CA3AF"
                        : "#6B7280",
                },
            },

            invalid: {
                color: "#dc2626",
            },
        },
    };


    const handleCardChange = (
        field,
        event
    ) => {

        setElementStates((prev) => ({
            ...prev,

            [field]: {
                complete: event.complete,
                error:
                    event.error?.message || "",
            },
        }));

    };


    const handleSubmit = async (event) => {

        event.preventDefault();


        /*
         * Validate shipping address again.
         *
         * This is intentionally checked again
         * at submit time instead of relying only
         * on the initial Checkout guard.
         */
        if (
            !selectedAddressId ||
            !selectedAddress
        ) {

            setErrorMessage(
                "Please select a valid shipping address before continuing."
            );

            return;
        }


        if (!stripe || !elements) {
            return;
        }


        if (!cart.length) {

            setErrorMessage(
                "Your cart is empty."
            );

            return;
        }


        /*
         * Validate Stripe Elements before
         * creating PaymentIntent.
         */
        const hasElementErrors =
            Object.values(elementStates)
                .some(
                    (state) => state.error
                );


        if (hasElementErrors) {

            setErrorMessage(
                "Please correct your card information before continuing."
            );

            return;
        }


        /*
         * Make sure all Stripe Elements
         * are complete.
         */
        const areElementsComplete =
            Object.values(elementStates)
                .every(
                    (state) => state.complete
                );


        if (!areElementsComplete) {

            setErrorMessage(
                "Please complete your card information before continuing."
            );

            return;
        }


        setIsProcessing(true);
        setErrorMessage("");
        setSuccessMessage("");


        try {

            const amount =
                Math.round(
                    totalPrice * 100
                );


            /*
             * Create PaymentIntent.
             */
            const data =
                await createPaymentIntent(
                    amount,
                    "usd"
                );


            console.log(
                "CREATE PAYMENT INTENT RESPONSE:",
                data
            );


            const cardNumberElement =
                elements.getElement(
                    CardNumberElement
                );


            if (!cardNumberElement) {

                throw new Error(
                    "Card number element is not available."
                );

            }


            /*
             * Confirm payment with Stripe.
             */
            const result =
                await stripe.confirmCardPayment(
                    data.clientSecret,
                    {
                        payment_method: {
                            card: cardNumberElement,
                        },
                    }
                );


            console.log(
                "CONFIRM PAYMENT RESULT:",
                result
            );


            if (result.error) {

                setErrorMessage(
                    result.error.message
                );

                return;
            }


            /*
             * Payment succeeded.
             */
            if (
                result.paymentIntent?.status ===
                "succeeded"
            ) {
                const orderData = {

                    totalPrice:
                    totalPrice,

                    paymentId:
                    result.paymentIntent.id,

                    paymentStatus:
                    result.paymentIntent.status,

                    selectedAddressId:
                    selectedAddressId,

                    items:
                        cart.map((item) => ({
                            productId:
                            item.id,

                            quantity:
                            item.quantity,

                            price:
                            item.price,
                        })),
                };


                const order =
                    await createOrder(
                        orderData
                    );


                console.log(
                    "CREATE ORDER RESPONSE:",
                    order
                );


                clearCart();


                navigate(
                    "/order-success",
                    {
                        state: {
                            orderId:
                            order.id,
                        },
                    }
                );

            }

        } catch (error) {

            console.error(error);


            setErrorMessage(
                error.response?.data?.message ||
                error.message ||
                "Payment failed."
            );

        } finally {

            setIsProcessing(false);

        }

    };


    return (
        <main
            className="
                min-h-screen
                bg-light
                px-4
                py-10
                dark:bg-dark
            "
        >

            <div className="mx-auto max-w-xl">

                <h1
                    className="
                        mb-3
                        text-3xl
                        font-bold
                        text-dark
                        dark:text-light
                    "
                >
                    Complete your payment
                </h1>


                <p
                    className="
                        mb-8
                        text-dark/70
                        dark:text-light/70
                    "
                >
                    You will be charged $
                    {totalPrice.toFixed(2)}
                </p>


                {/* Selected shipping address */}

                {selectedAddress && (

                    <div
                        className="
                            mb-6
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-5
                            shadow-sm
                            dark:border-gray-600
                            dark:bg-[#353932]
                        "
                    >

                        <h2
                            className="
                                mb-2
                                font-semibold
                                text-dark
                                dark:text-light
                            "
                        >
                            Shipping Address
                        </h2>


                        <p
                            className="
                                text-sm
                                leading-6
                                text-gray-600
                                dark:text-gray-300
                            "
                        >
                            <span className="font-semibold">
                                {selectedAddress.label}
                            </span>
                            {" — "}
                            {selectedAddress.street},{" "}
                            {selectedAddress.city},{" "}
                            {selectedAddress.state},{" "}
                            {selectedAddress.country}
                            {" - "}
                            {selectedAddress.postalCode}
                        </p>

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="
                        space-y-6
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-lg
                        dark:border
                        dark:border-gray-600
                        dark:bg-[#353932]
                    "
                >

                    {/* Success message */}

                    {successMessage && (

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-lg
                                border
                                border-green-300
                                bg-green-100
                                px-4
                                py-3
                                text-sm
                                text-green-700
                                dark:border-green-700
                                dark:bg-green-900/30
                                dark:text-green-300
                            "
                        >

                            <span>
                                {successMessage}
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setSuccessMessage("")
                                }
                                className="
                                    ml-4
                                    text-xl
                                    font-bold
                                    leading-none
                                    text-green-700
                                    transition
                                    hover:opacity-60
                                    dark:text-green-300
                                "
                                aria-label="Close"
                            >
                                ×
                            </button>

                        </div>

                    )}


                    {/* Error message */}

                    {errorMessage && (

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-lg
                                border
                                border-red-300
                                bg-red-100
                                px-4
                                py-3
                                text-sm
                                text-red-700
                                dark:border-red-700
                                dark:bg-red-900/30
                                dark:text-red-300
                            "
                        >

                            <span>
                                {errorMessage}
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setErrorMessage("")
                                }
                                className="
                                    ml-4
                                    text-xl
                                    font-bold
                                    leading-none
                                    text-red-700
                                    transition
                                    hover:opacity-60
                                    dark:text-red-300
                                "
                                aria-label="Close"
                            >
                                ×
                            </button>

                        </div>

                    )}


                    {/* Card Number */}

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
                            Card number
                        </label>


                        <div
                            className="
                                min-h-[50px]
                                rounded-lg
                                border-2
                                border-gray-400
                                bg-white
                                p-4
                                focus-within:border-primary
                                dark:border-gray-500
                                dark:bg-[#2d312b]
                            "
                        >

                            <CardNumberElement
                                options={elementOptions}
                                onChange={(event) =>
                                    handleCardChange(
                                        "cardNumber",
                                        event
                                    )
                                }
                            />

                        </div>


                        {elementStates.cardNumber.error && (

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-red-600
                                    dark:text-red-400
                                "
                            >
                                {
                                    elementStates
                                        .cardNumber
                                        .error
                                }
                            </p>

                        )}

                    </div>


                    {/* Expiry */}

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
                            Expiry date
                        </label>


                        <div
                            className="
                                min-h-[50px]
                                rounded-lg
                                border-2
                                border-gray-400
                                bg-white
                                p-4
                                focus-within:border-primary
                                dark:border-gray-500
                                dark:bg-[#2d312b]
                            "
                        >

                            <CardExpiryElement
                                options={elementOptions}
                                onChange={(event) =>
                                    handleCardChange(
                                        "cardExpiry",
                                        event
                                    )
                                }
                            />

                        </div>


                        {elementStates.cardExpiry.error && (

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-red-600
                                    dark:text-red-400
                                "
                            >
                                {
                                    elementStates
                                        .cardExpiry
                                        .error
                                }
                            </p>

                        )}

                    </div>


                    {/* CVC */}

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
                            CVC
                        </label>


                        <div
                            className="
                                min-h-[50px]
                                rounded-lg
                                border-2
                                border-gray-400
                                bg-white
                                p-4
                                focus-within:border-primary
                                dark:border-gray-500
                                dark:bg-[#2d312b]
                            "
                        >

                            <CardCvcElement
                                options={elementOptions}
                                onChange={(event) =>
                                    handleCardChange(
                                        "cardCvc",
                                        event
                                    )
                                }
                            />

                        </div>


                        {elementStates.cardCvc.error && (

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-red-600
                                    dark:text-red-400
                                "
                            >
                                {
                                    elementStates
                                        .cardCvc
                                        .error
                                }
                            </p>

                        )}

                    </div>


                    {/* Submit button */}

                    <button
                        type="submit"
                        disabled={
                            !stripe ||
                            isProcessing ||
                            !selectedAddress
                        }
                        className="
                            w-full
                            rounded-lg
                            bg-primary
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {isProcessing
                            ? "Payment processing..."
                            : "Pay now"}
                    </button>

                </form>

            </div>

        </main>
    );
};


export default Checkout;