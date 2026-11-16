import {useEffect, useState} from "react";
import {getCustomerOrders} from "../../api/order.service.js";
import Toast from "../ui/Toast.jsx";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getCustomerOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load your orders.");

                setToast({
                    message: "Failed to load your orders.",
                    type: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatPrice = (price) => {
        return `$${new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price)}`;
    };

    if (loading) {
        return (
            <main className="min-h-[70vh] bg-light px-4 py-12 dark:bg-black">
                <div className="mx-auto max-w-5xl">
                    <div className="flex min-h-[300px] items-center justify-center">
                        <p className="text-lg text-dark dark:text-white">
                            Loading your orders...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-[70vh] bg-light px-4 py-12 dark:bg-black">
                <div className="mx-auto max-w-5xl">

                    {toast && (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast(null)}
                        />
                    )}

                    <div className="rounded-2xl bg-lighter p-8 text-center shadow-sm dark:bg-dark">
                        <p className="text-lg text-dark dark:text-white">
                            {error}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[70vh] bg-light px-4 py-12 dark:bg-black">
            <div className="mx-auto max-w-5xl">

                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-semibold tracking-wide text-dark dark:text-white">
                        My Orders
                    </h1>

                    <p className="mt-2 text-base text-dark/70 dark:text-white/60">
                        View your previous orders and their details.
                    </p>
                </div>

                {/* Empty State */}
                {orders.length === 0 ? (
                    <div className="rounded-2xl bg-lighter px-6 py-16 text-center shadow-sm dark:bg-dark">
                        <h2 className="text-2xl font-semibold text-dark dark:text-white">
                            No orders yet
                        </h2>

                        <p className="mt-3 text-dark/60 dark:text-white/60">
                            You haven't placed any orders yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order) => (
                            <article
                                key={order.id}
                                className="overflow-hidden rounded-2xl bg-lighter shadow-sm dark:bg-dark"
                            >

                                {/* Order Header */}
                                <div
                                    className="flex flex-col gap-4 border-b border-dark/10 px-6 py-5
                                               sm:flex-row sm:items-center sm:justify-between
                                               dark:border-white/10"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold text-dark dark:text-white">
                                            Order #{order.id}
                                        </h2>

                                        <p className="mt-1 text-sm text-dark/60 dark:text-white/60">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full px-4 py-1.5 text-sm font-semibold ${
                                            order.paymentStatus?.toUpperCase() === "PAID"
                                                ? "bg-primary/15 text-primary"
                                                : "bg-dark/10 text-dark dark:bg-white/10 dark:text-white"
                                        }`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="divide-y divide-dark/10 px-6 dark:divide-white/10">

                                    {order.orderItems.map((item, index) => (
                                        <div
                                            key={`${item.productId}-${index}`}
                                            className="flex items-center gap-4 py-5"
                                        >
                                            <div
                                                className="h-20 w-20 shrink-0 overflow-hidden rounded-xl
                                                           bg-light dark:bg-black"
                                            >
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.productName}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-base font-semibold text-dark dark:text-white">
                                                    {item.productName}
                                                </h3>

                                                <p className="mt-1 text-sm text-dark/60 dark:text-white/60">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="shrink-0 text-sm font-semibold text-dark dark:text-white">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                                {/* Order Footer */}
                                <div className="flex items-center justify-between bg-light/60 px-6 py-5 dark:bg-black/40">
                                    <span className="text-base font-semibold text-dark dark:text-white">
                                        Total
                                    </span>

                                    <span className="text-lg font-bold text-primary">
                                        {formatPrice(order.totalPrice)}
                                    </span>
                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
};

export default OrderHistory;