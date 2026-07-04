import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-stone-200 bg-light">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center gap-3 font-primary">

                <p className="text-sm text-stone-500">
                    Crafted with{" "}
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="mx-1 text-primary"
                    />{" "}
                    using React & Spring Boot
                </p>

                <a
                    href="https://github.com/minaHosseiniii"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary transition-colors duration-300 hover:text-dark"
                >
                    © 2026 Mina Hosseini
                </a>

            </div>
        </footer>
    );
}