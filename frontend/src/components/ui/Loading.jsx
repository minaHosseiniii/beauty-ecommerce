import { FaSpinner } from "react-icons/fa";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 font-primary">
            <FaSpinner className="animate-spin text-4xl text-primary mb-4" />

            <p className="text-dark font-medium">
                Loading products...
            </p>
        </div>
    );
};

export default Loading;