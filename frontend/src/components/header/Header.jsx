import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLeaf,
    faMoon,
    faShoppingBasket,
    faSun,
    faAngleDown
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import useCart from "../../store/hooks/UseCart.jsx";
import useAuth from "../../store/hooks/UseAuth.jsx";

const Header = () => {

    const { totalQuantity } = useCart();

    const { authState } = useAuth();

    const { isAuthenticated } = authState;

    const isAdmin = true;

    const [isUserMenuOpen, setUserMenuOpen] = useState(false);

    const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

    const [theme, setTheme] = useState(() => {
        return (
            localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
        );
    });

    const navLinkClass = `
        font-primary
        text-base
        font-semibold
        text-primary
        dark:text-stone-200
        transition-colors
        duration-300
        hover:text-dark
        dark:hover:text-primary
    `;

    const getNavClass = ({ isActive }) => `
        ${navLinkClass}
        px-2
        py-1
        transition-all
        duration-300
        ${isActive ? "text-primary border-b-2 border-primary font-bold" : ""}
    `;

    const dropdownLinkClass = `
        block
        px-4
        py-2
        rounded-lg
        hover:bg-primary/10
        transition
    `;

    const toggleUserMenu = () => {
        setUserMenuOpen(prev => !prev);
    };

    const toggleAdminMenu = () => {
        setAdminMenuOpen(prev => !prev);
    };

    const toggleTheme = () => {

        const newTheme =
            theme === "dark"
                ? "light"
                : "dark";

        setTheme(newTheme);

        localStorage.setItem("theme", newTheme);

    };

    useEffect(() => {

        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

    }, [theme]);

    return (

        <header
            className="
                sticky
                top-0
                z-20
                bg-light/90
                dark:bg-[#171A16]/90
                backdrop-blur-md
                border-b
                border-stone-200
                dark:border-[#2B3328]
            "
        >

            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">

                <NavLink
                    to="/"
                    className="flex items-center gap-2"
                >

                    <FontAwesomeIcon
                        icon={faLeaf}
                        className="text-primary"
                    />

                    <span className="font-bold text-2xl">
                        Aura Cosmetics
                    </span>

                </NavLink>

                <nav>

                    <ul className="flex items-center gap-8">

                        <li>

                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 rounded-full border"
                            >

                                <FontAwesomeIcon
                                    icon={theme === "dark" ? faSun : faMoon}
                                />

                            </button>

                        </li>

                        <li>
                            <NavLink to="/" className={getNavClass}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/about" className={getNavClass}>
                                About
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact" className={getNavClass}>
                                Contact
                            </NavLink>
                        </li>

                        <li>

                            {isAuthenticated ? (

                                <div className="relative">

                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center gap-2"
                                    >

                                        Hello John Doe

                                        <FontAwesomeIcon icon={faAngleDown} />

                                    </button>

                                    {isUserMenuOpen && (

                                        <div
                                            className="
                                                absolute
                                                right-0
                                                mt-3
                                                w-56
                                                rounded-xl
                                                bg-white
                                                dark:bg-[#23271F]
                                                shadow-lg
                                                border
                                            "
                                        >

                                            <ul>

                                                <li>
                                                    <Link
                                                        to="/profile"
                                                        className={dropdownLinkClass}
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        to="/orders"
                                                        className={dropdownLinkClass}
                                                    >
                                                        Orders
                                                    </Link>
                                                </li>

                                                {isAdmin && (

                                                    <li>

                                                        <button
                                                            onClick={toggleAdminMenu}
                                                            className="w-full flex justify-between px-4 py-2"
                                                        >

                                                            Admin

                                                            <FontAwesomeIcon
                                                                icon={faAngleDown}
                                                            />

                                                        </button>

                                                        {isAdminMenuOpen && (

                                                            <ul className="pl-4">

                                                                <li>

                                                                    <Link
                                                                        to="/admin/orders"
                                                                        className={dropdownLinkClass}
                                                                    >
                                                                        Orders
                                                                    </Link>

                                                                </li>

                                                                <li>

                                                                    <Link
                                                                        to="/admin/messages"
                                                                        className={dropdownLinkClass}
                                                                    >
                                                                        Messages
                                                                    </Link>

                                                                </li>

                                                            </ul>

                                                        )}

                                                    </li>

                                                )}

                                                <li>

                                                    <Link
                                                        to="/"
                                                        className={dropdownLinkClass}
                                                    >
                                                        Logout
                                                    </Link>

                                                </li>

                                            </ul>

                                        </div>

                                    )}

                                </div>

                            ) : (

                                <NavLink
                                    to="/login"
                                    className={getNavClass}
                                >
                                    Login
                                </NavLink>

                            )}

                        </li>

                        <li>

                            <NavLink
                                to="/cart"
                                className="relative"
                            >

                                <FontAwesomeIcon
                                    icon={faShoppingBasket}
                                    className="text-xl"
                                />

                                {totalQuantity > 0 && (

                                    <span
                                        className="
                                            absolute
                                            -top-2
                                            -right-3
                                            w-5
                                            h-5
                                            rounded-full
                                            bg-primary
                                            text-white
                                            text-[11px]
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        {totalQuantity}
                                    </span>

                                )}

                            </NavLink>

                        </li>

                    </ul>

                </nav>

            </div>

        </header>

    );

};

export default Header;