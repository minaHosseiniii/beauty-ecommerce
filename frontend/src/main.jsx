import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

import "./index.css";
import CartProvider from "./store/providers/CartProvider.jsx";
import AuthProvider from "./store/providers/AuthProvider.jsx";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const theme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

if (theme === "dark") {
    document.documentElement.classList.add("dark");
}

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

createRoot(document.getElementById("root")).render(
    <Elements stripe={stripePromise}>
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={router}/>
            </CartProvider>
        </AuthProvider>
    </Elements>
);