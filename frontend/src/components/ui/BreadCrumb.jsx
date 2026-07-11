import {Link, useLocation} from "react-router-dom";

const BreadCrumb = () => {
    const location = useLocation();

    const pathname = location.pathname
        .split("/")
        .filter(Boolean);

    if (!pathname.length) return null;

    return (
        <nav
            className="
    w-full
    max-w-6xl
    mx-auto
    px-6
    pt-6
    pb-2
    text-sm
    text-stone-500
    dark:text-stone-400
  "
        >
            <ol className="flex items-center gap-2">
                <li>
                    <Link
                        to="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                </li>

                {pathname.map((value, index) => {
                    const to =
                        "/" +
                        pathname
                            .slice(0, index + 1)
                            .join("/");

                    const isLast =
                        index === pathname.length - 1;

                    const label =
                        value
                            .replace("-", " ")
                            .replace(
                                /^\w/,
                                c => c.toUpperCase()
                            );

                    return (
                        <li
                            key={to}
                            className="flex items-center gap-2"
                        >
                            <span>/</span>

                            {isLast ? (
                                <span className="font-medium text-primary">
                  {label}
                </span>
                            ) : (
                                <Link
                                    to={to}
                                    className="hover:text-primary transition-colors"
                                >
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
export default BreadCrumb;