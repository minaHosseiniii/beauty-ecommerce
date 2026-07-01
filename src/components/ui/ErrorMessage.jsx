import { FaCircleExclamation } from "react-icons/fa6";

export default function ErrorMessage({ message }) {
    return (
        <div className="flex justify-center items-center gap-2 py-10 text-red-600">
            <FaCircleExclamation />
            <span>{message}</span>
        </div>
    );
}