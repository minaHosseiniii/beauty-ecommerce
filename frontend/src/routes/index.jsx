import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";

import Layout from "../Layout";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import Login from "../components/pages/Login";
import Cart from "../components/pages/Cart";
import ErrorPage from "../components/ui/ErrorPage.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Layout />}
            errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
        </Route>
    )
);