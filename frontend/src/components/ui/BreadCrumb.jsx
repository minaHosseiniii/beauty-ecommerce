import {
    Link,
    useLocation,
    useMatches
} from "react-router-dom";

const BreadCrumb = () => {
    const location = useLocation();
    const matches = useMatches();

    const pathname = location.pathname
        .split("/")
        .filter(Boolean);

    if (!pathname.length) return null;

    const productMatch = matches.find(
        m => m.pathname.includes("/products/")
    );

    const productName =
        productMatch?.data?.product?.name;

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
                        className="hover:text-primary"
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

                    let label =
                        value
                            .replace("-", " ")
                            .replace(
                                /^\w/,
                                c => c.toUpperCase()
                            );

                    if (
                        value === pathname[pathname.length - 1] &&
                        productName
                    ) {
                        label = productName;
                    }

                    return (
                        <li
                            key={to}
                            className="flex items-center gap-2"
                        >
                            <span>/</span>

                            {isLast ? (
                                <span className="text-primary font-medium">
                  {label}
                </span>
                            ) : (
                                <Link
                                    to={to}
                                    className="hover:text-primary"
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