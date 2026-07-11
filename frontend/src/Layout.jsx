import Header from "./components/header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import BreadCrumb from "./components/ui/BreadCrumb.jsx";

function Layout() {
    return (
        <div
            className="
        min-h-screen
        flex
        flex-col
        bg-light
        text-dark
        dark:bg-[#121212]
        dark:text-light
        transition-colors
        duration-300
      ">
            <Header />
            <BreadCrumb />
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;