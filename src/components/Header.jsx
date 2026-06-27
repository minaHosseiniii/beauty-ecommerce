import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagicWandSparkles, faShoppingBasket} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navLinkClass = `text-center text-lg font-primary font-semibold text-primary py-2`;

    return (
        <header className="border-b border-gray-300 sticky top-0 z-20 bg-white">
            <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
                <a href="/" className="link">
                    <FontAwesomeIcon
                        icon={faMagicWandSparkles}
                        className="text-primary h-8 w-8"
                    />
                    <span className="text-lg font-primary font-semibold text-primary py-2">
                        Aura Cosmetics
                    </span>
                </a>
                <nav className="flex items-center py-2 z-10">
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/" className={navLinkClass}>Home</a>
                        </li>
                        <li>
                            <a href="/about" className={navLinkClass}>About</a>
                        </li>
                        <li>
                            <a href="/contact" className={navLinkClass}>Contact</a>
                        </li>
                        <li>
                            <a href="/login" className={navLinkClass}>Login</a>
                        </li>
                        <li>
                            <a href="/cart" className={navLinkClass}>
                                <FontAwesomeIcon icon={faShoppingBasket}/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;