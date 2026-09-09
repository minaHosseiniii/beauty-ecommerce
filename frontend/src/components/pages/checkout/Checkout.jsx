import {useEffect, useState} from "react";
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe,} from "@stripe/react-stripe-js";

import UseCart from "../../../store/hooks/UseCart.jsx";
import {createPaymentIntent} from "../../../api/payment.service.js";
import {createOrder} from "../../../api/order.service.js";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();

    const {
        cart,
        totalPrice,
        clearCart,
    } = UseCart();

    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [elementStates, setElementStates] = useState({
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

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(
                document.documentElement.classList.contains("dark")
            );
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const elementOptions = {
        style: {
            base: {
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                color: isDark ? "#FFFFFF" : "#000000",
                fontSmoothing: "antialiased",
                "::placeholder": {
                    color: isDark ? "#9CA3AF" : "#6B7280",
                },
            },
            invalid: {
                color: "#dc2626",
            },
        },
    };

    const handleCardChange = (field, event) => {
        setElementStates((prev) => ({
            ...prev,
            [field]: {
                complete: event.complete,
                error: event.error?.message || "",
            },
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!cart.length) {
            setErrorMessage("Your cart is empty.");
            return;
        }

        // Validate Stripe Elements before creating PaymentIntent
        const hasElementErrors = Object.values(elementStates)
            .some((state) => state.error);

        if (hasElementErrors) {
            setErrorMessage(
                "Please correct your card information before continuing."
            );
            return;
        }

        // Make sure all Stripe Elements are complete
        const areElementsComplete = Object.values(elementStates)
            .every((state) => state.complete);

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
            const amount = Math.round(totalPrice * 100);

            const data = await createPaymentIntent(
                amount,
                "usd"
            );

            console.log(
                "CREATE PAYMENT INTENT RESPONSE:",
                data
            );

            const cardNumberElement =
                elements.getElement(CardNumberElement);

            if (!cardNumberElement) {
                throw new Error(
                    "Card number element is not available."
                );
            }

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
                setErrorMessage(result.error.message);
                return;
            }

            if (
                result.paymentIntent?.status ===
                "succeeded"
            ) {
                const orderData = {
                    totalPrice: totalPrice,
                    paymentId: result.paymentIntent.id,
                    paymentStatus: result.paymentIntent.status,
                    items: cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                };

                const order = await createOrder(orderData);

                console.log(
                    "CREATE ORDER RESPONSE:",
                    order
                );

                clearCart();

                setSuccessMessage(
                    "Payment successful!"
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
        <main className="
            min-h-screen
            bg-light
            px-4
            py-10
            dark:bg-dark
        ">

            <div className="mx-auto max-w-xl">

                <h1 className="
                    mb-3
                    text-3xl
                    font-bold
                    text-dark
                    dark:text-light
                ">
                    Complete your payment
                </h1>

                <p className="
                    mb-8
                    text-dark/70
                    dark:text-light/70
                ">
                    You will be charged $
                    {totalPrice.toFixed(2)}
                </p>

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
                        <div className="
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
                        ">
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
                        <div className="
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
                        ">
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
                        <label className="
                            mb-2
                            block
                            font-semibold
                            text-dark
                            dark:text-light
                        ">
                            Card number
                        </label>

                        <div className="
                            min-h-[50px]
                            rounded-lg
                            border-2
                            border-gray-400
                            bg-white
                            p-4
                            focus-within:border-primary
                            dark:border-gray-500
                            dark:bg-[#2d312b]
                        ">
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
                            <p className="
                                mt-2
                                text-sm
                                text-red-600
                                dark:text-red-400
                            ">
                                {elementStates.cardNumber.error}
                            </p>
                        )}
                    </div>

                    {/* Expiry */}

                    <div>
                        <label className="
                            mb-2
                            block
                            font-semibold
                            text-dark
                            dark:text-light
                        ">
                            Expiry date
                        </label>

                        <div className="
                            min-h-[50px]
                            rounded-lg
                            border-2
                            border-gray-400
                            bg-white
                            p-4
                            focus-within:border-primary
                            dark:border-gray-500
                            dark:bg-[#2d312b]
                        ">
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
                            <p className="
                                mt-2
                                text-sm
                                text-red-600
                                dark:text-red-400
                            ">
                                {elementStates.cardExpiry.error}
                            </p>
                        )}
                    </div>

                    {/* CVC */}

                    <div>
                        <label className="
                            mb-2
                            block
                            font-semibold
                            text-dark
                            dark:text-light
                        ">
                            CVC
                        </label>

                        <div className="
                            min-h-[50px]
                            rounded-lg
                            border-2
                            border-gray-400
                            bg-white
                            p-4
                            focus-within:border-primary
                            dark:border-gray-500
                            dark:bg-[#2d312b]
                        ">
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
                            <p className="
                                mt-2
                                text-sm
                                text-red-600
                                dark:text-red-400
                            ">
                                {elementStates.cardCvc.error}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}

                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
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