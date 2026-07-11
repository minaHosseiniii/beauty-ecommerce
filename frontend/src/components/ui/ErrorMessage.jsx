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
        dark:border-red-900/50
        bg-red-50
        dark:bg-red-950/30
        shadow-sm
        font-primary
        transition-colors
        duration-300">
                <FaCircleExclamation
                    className="
                        text-red-500
                        dark:text-red-400
                        text-2xl
                        flex-shrink-0
                    "
                />

                <div>
                    <h3
                        className="
                            font-semibold
                            text-red-700
                            dark:text-red-300
                            transition-colors
                            duration-300
                        "
                    >
                        Something went wrong
                    </h3>

                    <p
                        className="
                            text-sm
                            mt-1
                            text-red-600
                            dark:text-red-400
                            transition-colors
                            duration-300
                        "
                    >
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}