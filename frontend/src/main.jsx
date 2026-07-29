import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

import "./index.css";
import CartProvider from "./store/providers/CartProvider.jsx";
import AuthProvider from "./store/providers/AuthProvider.jsx";

const theme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

if (theme === "dark") {
    document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={router}/>
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);