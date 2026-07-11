import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer
            className="
        mt-20
        border-t
        border-stone-200
        dark:border-stone-800
        bg-light
        dark:bg-[#121212]
        transition-colors
        duration-300
    "
        >
            <div
                className="
                    max-w-6xl
                    mx-auto
                    px-6
                    py-8
                    flex
                    flex-col
                    items-center
                    gap-3
                    font-primary
                "
            >
                <p className="text-sm text-stone-500 dark:text-stone-400">
                    Crafted with{" "}
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="
                            mx-1
                            text-primary
                            dark:text-emerald-300
                            transition-colors
                            duration-300
                        "
                    />{" "}
                    using React & Spring Boot
                </p>

                <a
                    href="https://github.com/minaHosseiniii"
                    target="_blank"
                    rel="noreferrer"
                    className=" font-semibold
        text-primary
        transition-colors
        duration-300
        hover:text-dark
        dark:hover:text-light">
                    © 2026 Mina Hosseini
                </a>
            </div>
        </footer>
    );
}