import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {

    const location = useLocation();

    const orderId = location.state?.orderId;

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
                text-center
                shadow-lg
                dark:bg-[#353932]
            ">

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
                    mb-4
                    text-dark/70
                    dark:text-light/70
                ">
                    Your order has been placed successfully.
                </p>

                {orderId && (
                    <p className="
                        mb-8
                        text-sm
                        text-dark/60
                        dark:text-light/60
                    ">
                        Order ID: {orderId}
                    </p>
                )}

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
        </main>
    );
};

export default OrderSuccess;