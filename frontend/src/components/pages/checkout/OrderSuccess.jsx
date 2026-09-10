import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById} from "../../../api/order.service.js";

const OrderSuccess = () => {

    const location = useLocation();

    const orderId = location.state?.orderId;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!orderId) {
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const data = await getOrderById(orderId);
                setOrder(data);
            } catch (error) {
                console.error("GET ORDER ERROR:", error);
                setError("Failed to load order.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();

    }, [orderId]);

    const formattedDate = order?.createdAt
        ? new Date(order.createdAt).toLocaleString()
        : "";

    return (
        <main className="
            min-h-screen
            bg-light
            px-4
            py-10
            dark:bg-dark
        ">
            <div className="
                mx-auto
                max-w-xl
                rounded-2xl
                bg-white
                p-8
                shadow-lg
                dark:bg-[#353932]
            ">

                <div className="text-center">

                    <h1 className="
                        mb-4
                        text-3xl
                        font-bold
                        text-dark
                        dark:text-light
                    ">
                        Payment successful!
                    </h1>

                    <p className="
                        mb-6
                        text-dark/70
                        dark:text-light/70
                    ">
                        Your order has been placed successfully.
                    </p>

                </div>

                {loading && (
                    <p className="
                        mb-8
                        text-center
                        text-dark/60
                        dark:text-light/60
                    ">
                        Loading order details...
                    </p>
                )}

                {error && (
                    <p className="
                        mb-8
                        text-center
                        text-red-500
                    ">
                        {error}
                    </p>
                )}

                {!loading && !error && order && (
                    <div className="
                        text-dark
                        dark:text-light
                    ">

                        <div className="
                            mb-6
                            rounded-lg
                            bg-light
                            p-4
                            dark:bg-dark
                        ">

                            <p className="mb-2">
                                <strong>Order ID:</strong> {order.id}
                            </p>

                            <p className="mb-2">
                                <strong>Date:</strong> {formattedDate}
                            </p>

                            <p className="mb-2">
                                <strong>Payment status:</strong>{" "}
                                {order.paymentStatus}
                            </p>

                            <p>
                                <strong>Total:</strong> ${order.totalPrice}
                            </p>

                        </div>

                        <h2 className="
                            mb-3
                            text-lg
                            font-semibold
                        ">
                            Order items
                        </h2>

                        <div className="mb-8 space-y-2">

                            {order.items?.map((item) => (
                                <div
                                    key={item.productId}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-lg
                                        bg-light
                                        p-3
                                        dark:bg-dark
                                    "
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.productName}
                                        </p>

                                        <p className="
                                            text-sm
                                            text-dark/60
                                            dark:text-light/60
                                        ">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-medium">
                                        ${item.price}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                )}

                {!orderId && (
                    <p className="
                        mb-8
                        text-center
                        text-red-500
                    ">
                        Order ID is missing.
                    </p>
                )}

                <div className="text-center">

                    <Link
                        to="/"
                        className="
                            inline-block
                            rounded-lg
                            bg-primary
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >
                        Continue shopping
                    </Link>

                </div>

            </div>
        </main>
    );
};

export default OrderSuccess;