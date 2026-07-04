import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLeaf,
    faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navLinkClass = `
        font-primary
        text-base
        font-semibold
        text-primary
        transition-colors
        duration-300
        hover:text-dark
    `;

    return (
        <header className="sticky top-0 z-20 bg-light/90 backdrop-blur-md border-b border-stone-200">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">

                <a
                    href="/"
                    className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
                >
                    <FontAwesomeIcon
                        icon={faLeaf}
                        className="text-primary text-xl"
                    />

                    <span className="font-primary text-2xl font-bold text-primary tracking-wide">
                        Aura Cosmetics
                    </span>
                </a>

                <nav>
                    <ul className="flex items-center gap-8">

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
                                <FontAwesomeIcon icon={faShoppingBasket} />
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;