import { useState } from "react";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [elementErrors, setElementErrors] = useState({
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
    });

    const handleCardChange = (event, field) => {
        setElementErrors((previous) => ({
            ...previous,
            [field]: event.error?.message || "",
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not ready yet.");
            return;
        }

        setProcessing(true);

        try {
            const cardNumberElement =
                elements.getElement(CardNumberElement);

            if (!cardNumberElement) {
                setErrorMessage("Card information is not available.");
                return;
            }

            const result = await stripe.createPaymentMethod({
                type: "card",
                card: cardNumberElement,
            });

            if (result.error) {
                setErrorMessage(result.error.message);
                return;
            }

            console.log("Payment Method:", result.paymentMethod);

            const paymentMethodId = result.paymentMethod.id;

            console.log("Payment Method ID:", paymentMethodId);

            // TODO:
            // Send paymentMethodId + order information
            // to backend.

            setSuccessMessage(
                "Payment method created successfully."
            );
        } catch (error) {
            console.error(error);

            setErrorMessage(
                "Something went wrong while processing the payment."
            );
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark px-4 py-10">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-dark dark:text-light">
                        Checkout
                    </h1>

                    <p className="mt-2 text-dark/70 dark:text-light/70">
                        Enter your card details to continue with your
                        payment.
                    </p>
                </div>

                {/* Checkout Card */}
                <div className="rounded-2xl bg-lighter p-6 shadow-lg dark:bg-dark">

                    <form onSubmit={handleSubmit}>

                        {/* Card Number */}
                        <div className="mb-6">
                            <label
                                htmlFor="card-number"
                                className="mb-2 block text-sm font-semibold text-dark dark:text-light"
                            >
                                Card Number
                            </label>

                            <div
                                className={`rounded-lg border p-3 ${
                                    elementErrors.cardNumber
                                        ? "border-red-500"
                                        : "border-gray-300 dark:border-gray-600"
                                }`}
                            >
                                <CardNumberElement
                                    id="card-number"
                                    onChange={(event) =>
                                        handleCardChange(
                                            event,
                                            "cardNumber"
                                        )
                                    }
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                fontFamily:
                                                    "Josefin Sans, sans-serif",
                                                color: "#3F433B",
                                                "::placeholder": {
                                                    color: "#9CA3AF",
                                                },
                                            },
                                            invalid: {
                                                color: "#DC2626",
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {elementErrors.cardNumber && (
                                <p className="mt-2 text-sm text-red-500">
                                    {elementErrors.cardNumber}
                                </p>
                            )}
                        </div>

                        {/* Expiry + CVC */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                            {/* Expiry */}
                            <div>
                                <label
                                    htmlFor="card-expiry"
                                    className="mb-2 block text-sm font-semibold text-dark dark:text-light"
                                >
                                    Expiration Date
                                </label>

                                <div
                                    className={`rounded-lg border p-3 ${
                                        elementErrors.cardExpiry
                                            ? "border-red-500"
                                            : "border-gray-300 dark:border-gray-600"
                                    }`}
                                >
                                    <CardExpiryElement
                                        id="card-expiry"
                                        onChange={(event) =>
                                            handleCardChange(
                                                event,
                                                "cardExpiry"
                                            )
                                        }
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    fontFamily:
                                                        "Josefin Sans, sans-serif",
                                                    color: "#3F433B",
                                                    "::placeholder": {
                                                        color: "#9CA3AF",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#DC2626",
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                {elementErrors.cardExpiry && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {elementErrors.cardExpiry}
                                    </p>
                                )}
                            </div>

                            {/* CVC */}
                            <div>
                                <label
                                    htmlFor="card-cvc"
                                    className="mb-2 block text-sm font-semibold text-dark dark:text-light"
                                >
                                    CVC
                                </label>

                                <div
                                    className={`rounded-lg border p-3 ${
                                        elementErrors.cardCvc
                                            ? "border-red-500"
                                            : "border-gray-300 dark:border-gray-600"
                                    }`}
                                >
                                    <CardCvcElement
                                        id="card-cvc"
                                        onChange={(event) =>
                                            handleCardChange(
                                                event,
                                                "cardCvc"
                                            )
                                        }
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    fontFamily:
                                                        "Josefin Sans, sans-serif",
                                                    color: "#3F433B",
                                                    "::placeholder": {
                                                        color: "#9CA3AF",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#DC2626",
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                {elementErrors.cardCvc && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {elementErrors.cardCvc}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Error */}
                        {errorMessage && (
                            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                                {errorMessage}
                            </div>
                        )}

                        {/* Success */}
                        {successMessage && (
                            <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
                                {successMessage}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!stripe || processing}
                            className="mt-8 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? "Processing..."
                                : "Pay Now"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;