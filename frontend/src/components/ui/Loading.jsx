import { FaSpinner } from "react-icons/fa";

const Loading = () => {
    return (
        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                py-16
                font-primary
            "
        >
            <FaSpinner
                className="
        animate-spin
        text-4xl
        text-primary
        mb-4
        transition-colors
        duration-300
    "
            />

            <p
                className="
        font-medium
        text-dark
        dark:text-light
        transition-colors
        duration-300
    "
            >
                Loading products...
            </p>
        </div>
    );
};

export default Loading;