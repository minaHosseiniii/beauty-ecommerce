import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeaf, faMoon, faShoppingBasket, faSun} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const Header = () => {
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

    const toggleTheme = () => {
        const newTheme = theme === "dark"
            ? "light"
            : "dark";

        setTheme(newTheme);
        localStorage.setItem(
            "theme",
            newTheme
        );
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
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
        transition-colors
        duration-300
">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">

                <a
                    href="/"
                    className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80">
                    <FontAwesomeIcon
                        icon={faLeaf}
                        className="text-primary dark:text-emerald-300 text-xl"/>
                    <span
                        className="font-primary text-2xl font-bold text-primary dark:text-stone-100 tracking-wide">
                        Aura Cosmetics
                    </span>
                </a>

                <nav>
                    <ul className="flex items-center gap-8">

                        <li>
                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle Theme"
                                className="
      flex
      items-center
      justify-center
      w-9
      h-9
      rounded-full
      border
      border-primary/40
      text-primary
      dark:text-stone-200
      hover:bg-primary/10
      dark:hover:bg-stone-800
      transition-all
      duration-300
    ">
                                <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon}/>
                            </button>
                        </li>

                        <li>
                            <a href="/" className={navLinkClass}>
                                Home
                            </a>
                        </li>

                        <li>
                            <a href="/about" className={navLinkClass}>
                                About
                            </a>
                        </li>

                        <li>
                            <a href="/contact" className={navLinkClass}>
                                Contact
                            </a>
                        </li>

                        <li>
                            <a href="/login" className={navLinkClass}>
                                Login
                            </a>
                        </li>

                        <li>
                            <a
                                href="/cart"
                                className={`${navLinkClass} text-lg`}
                            >
                                <FontAwesomeIcon icon={faShoppingBasket}/>
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;