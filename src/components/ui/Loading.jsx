import { FaSpinner } from "react-icons/fa";

const Loading = () => {
    return (
        <div className="flex justify-center items-center gap-2 py-10">
            <FaSpinner className="animate-spin text-pink-500 text-2xl" />
            <span>Loading...</span>
        </div>
    );
}
export default Loading;