import { FaCircleExclamation } from "react-icons/fa6";

export default function ErrorMessage({ message }) {
    return (
        <div className="flex justify-center py-12">
            <div
                className="
                    flex
                    items-center
                    gap-3
                    max-w-lg
                    w-full
                    px-6
                    py-4
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    shadow-sm
                    font-primary
                "
            >
                <FaCircleExclamation className="text-red-500 text-2xl flex-shrink-0" />

                <div>
                    <h3 className="font-semibold text-red-700">
                        Something went wrong
                    </h3>

                    <p className="text-red-600 text-sm mt-1">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}