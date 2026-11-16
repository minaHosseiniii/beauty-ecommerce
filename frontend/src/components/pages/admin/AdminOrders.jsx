
import {useEffect, useState} from "react";
import {
    cancelOrder,
    confirmOrder,
    getAllCreatedOrders
} from "../../../api/order.service.js";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingOrderId, setProcessingOrderId] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getAllCreatedOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const handleConfirm = async (orderId) => {
        try {
            setProcessingOrderId(orderId);

            await confirmOrder(orderId);

            setOrders((currentOrders) =>
                currentOrders.filter((order) => order.id !== orderId)
            );
        } catch (error) {
            console.error(error);
            setError("Failed to confirm the order.");
        } finally {
            setProcessingOrderId(null);
        }
    };

    const handleCancel = async (orderId) => {
        try {
            setProcessingOrderId(orderId);

            await cancelOrder(orderId);

            setOrders((currentOrders) =>
                currentOrders.filter((order) => order.id !== orderId)
            );
        } catch (error) {
            console.error(error);
            setError("Failed to cancel the order.");
        } finally {
            setProcessingOrderId(null);
        }
    };

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

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return "";
        }

        if (imageUrl.startsWith("/")) {
            return imageUrl;
        }

        return `/${imageUrl}`;
    };

    if (loading) {
        return (
            <main className="min-h-[70vh] bg-light px-4 py-12 dark:bg-black">
                <div className="mx-auto max-w-5xl">
                    <div className="flex min-h-[300px] items-center justify-center">
                        <p className="text-lg text-dark dark:text-white">
                            Loading orders...
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

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-semibold tracking-wide text-dark dark:text-white">
                        Admin Orders
                    </h1>

                    <p className="mt-2 text-base text-dark/70 dark:text-white/60">
                        Review and manage newly created orders.
                    </p>
                </div>

                {/* Empty State */}
                {orders.length === 0 ? (
                    <div className="rounded-2xl bg-lighter px-6 py-16 text-center shadow-sm dark:bg-dark">
                        <h2 className="text-2xl font-semibold text-dark dark:text-white">
                            No new orders
                        </h2>

                        <p className="mt-3 text-dark/60 dark:text-white/60">
                            There are no orders waiting for review.
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
                                        className="w-fit rounded-full bg-primary/15 px-4 py-1.5
                                                   text-sm font-semibold text-primary"
                                    >
                                        {order.orderStatus}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="divide-y divide-dark/10 px-6 dark:divide-white/10">

                                    {order.orderItems.map((item, index) => (
                                        <div
                                            key={`${item.productId}-${index}`}
                                            className="flex items-center gap-4 py-5"
                                        >

                                            {/* Product Image */}
                                            <div
                                                className="h-20 w-20 shrink-0 overflow-hidden rounded-xl
                                                           bg-light dark:bg-black"
                                            >
                                                <img
                                                    src={getImageUrl(item.imageUrl)}
                                                    alt={item.productName}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-base font-semibold text-dark dark:text-white">
                                                    {item.productName}
                                                </h3>

                                                <p className="mt-1 text-sm text-dark/60 dark:text-white/60">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            {/* Product Price */}
                                            <p className="shrink-0 text-sm font-semibold text-dark dark:text-white">
                                                {formatPrice(item.price)}
                                            </p>

                                        </div>
                                    ))}

                                </div>

                                {/* Order Footer */}
                                <div
                                    className="flex flex-col gap-4 bg-light/60 px-6 py-5
                                               sm:flex-row sm:items-center sm:justify-between
                                               dark:bg-black/40"
                                >

                                    <div>
                                        <span className="text-base font-semibold text-dark dark:text-white">
                                            Total
                                        </span>

                                        <span className="ml-3 text-lg font-bold text-primary">
                                            {formatPrice(order.totalPrice)}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">

                                        <button
                                            type="button"
                                            disabled={processingOrderId === order.id}
                                            onClick={() => handleCancel(order.id)}
                                            className="rounded-xl border border-dark/15 px-5 py-2.5
                                                       text-sm font-semibold text-dark transition
                                                       hover:bg-dark/5
                                                       disabled:cursor-not-allowed disabled:opacity-50
                                                       dark:border-white/15 dark:text-white
                                                       dark:hover:bg-white/5"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            disabled={processingOrderId === order.id}
                                            onClick={() => handleConfirm(order.id)}
                                            className="rounded-xl bg-primary px-5 py-2.5
                                                       text-sm font-semibold text-white transition
                                                       hover:opacity-90
                                                       disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Confirm
                                        </button>

                                    </div>

                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
};

export default AdminOrders;