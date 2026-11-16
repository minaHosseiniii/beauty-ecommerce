const Toast = ({ message, type = "success", onClose }) => {
    const isSuccess = type === "success";

    return (
        <div
            className={`fixed right-6 top-6 z-50 flex items-center gap-4 rounded-xl px-5 py-4 shadow-lg ${
                isSuccess
                    ? "bg-primary text-white"
                    : "bg-red-600 text-white"
            }`}
        >
            <p className="text-sm font-medium">
                {message}
            </p>

            <button
                type="button"
                onClick={onClose}
                className="text-lg font-bold opacity-80 transition hover:opacity-100"
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
};

export default Toast;