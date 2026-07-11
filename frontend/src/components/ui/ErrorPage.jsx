import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import {
    Link,
    useRouteError,
} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex flex-col bg-light dark:bg-[#121212]">
            <Header />

            <main className="flex-1 flex items-center justify-center px-6 py-16">
                <div
                    className="
            max-w-lg
            w-full
            text-center
            rounded-3xl
            border
            border-stone-200
            dark:border-[#2B3328]
            bg-white
            dark:bg-[#171A16]
            p-10
            shadow-lg
          "
                >
                    <h1
                        className="
              text-8xl
              font-bold
              text-primary
              mb-4
            "
                    >
                        {error?.status || "404"}
                    </h1>

                    <h2
                        className="
              text-3xl
              font-bold
              text-dark
              dark:text-stone-100
              mb-4
            "
                    >
                        Sorry, we couldn't find the page you're looking for.
                        It may have been moved or deleted.
                    </h2>

                    <p
                        className="
              text-stone-600
              dark:text-stone-400
              mb-8
              leading-7
            "
                    >
                        {error?.data ||
                            "Something went wrong. The page you're looking for doesn't exist."}
                    </p>

                    <Link
                        to="/"
                        className="
              inline-flex
              items-center
              justify-center
              px-6
              py-3
              rounded-xl
              bg-primary
              text-white
              font-semibold
              hover:opacity-90
              transition-all
              duration-300
            "
                    >
                        ← Back To Home
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ErrorPage;