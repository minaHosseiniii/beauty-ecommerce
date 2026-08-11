import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";

import Layout from "../Layout";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import Login from "../components/pages/Login";
import Cart from "../components/pages/Cart";
import ErrorPage from "../components/ui/ErrorPage.jsx";
import {productsLoader} from "../loader/products.loader.js";
import {contactAction} from "../action/contact.action.js";
import ProductDetails from "../components/pages/ProductDetails.jsx";
import {productsDetailsLoader} from "../loader/products.details.loader.js";
import {authActions, registerAction} from "../action/auth.actions.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Register from "../components/pages/Register.jsx";
import {profileLoader} from "../loader/profile.loader.js";
import Profile from "../components/pages/Profile.jsx";
import {profileAction} from "../action/profile.action.js";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Layout/>}
            errorElement={<ErrorPage/>}>
            <Route index element={<Home/>} loader={productsLoader}/>
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<Contact/>} action={contactAction}/>
            <Route path="login" element={<Login/>} action={authActions}/>
            <Route path="register" element={<Register/>} action={registerAction}/>
            <Route element={<ProtectedRoute/>}>
                <Route path="cart" element={<Cart/>}/>
            </Route>
            <Route path="products/:productId" element={<ProductDetails/>}
                   loader={productsDetailsLoader}/>
            <Route path="profile" element={<Profile/>} loader={profileLoader} action={profileAction}/>
        </Route>
    )
);