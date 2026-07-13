import PageTitle from "../../components/pages/PageTitle.jsx";

const inputStyle = `
    w-full
    px-4
    py-3
    rounded-xl
    border
    border-gray-300
    dark:border-gray-700
    bg-white
    dark:bg-dark
    text-dark
    dark:text-light
    placeholder:text-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-primary
`;

const Contact = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-14">

            <PageTitle title="Contact Us" />

            <p
                className="
                    mt-8
                    text-center
                    text-gray-600
                    dark:text-gray-300
                    max-w-2xl
                    mx-auto
                    leading-8
                "
            >
                We'd love to hear from you. If you have any
                questions, feedback, or suggestions, please
                don't hesitate to reach out.
            </p>

            <form
                className="
                    mt-14
                    bg-white
                    dark:bg-dark
                    rounded-3xl
                    shadow-lg
                    p-8
                    md:p-10
                    border
                    border-gray-100
                    dark:border-gray-700
                    space-y-6
                "
            >
                <div>
                    <label
                        className="
                            block
                            mb-2
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Your Name"
                        className={inputStyle}
                        minLength={5}
                        maxLength={30}
                        required
                    />
                </div>

                <div>
                    <label
                        className="
                            block
                            mb-2
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Your Email"
                        className={inputStyle}
                        required
                    />
                </div>

                <div>
                    <label
                        className="
                            block
                            mb-2
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        placeholder="09123456789"
                        className={inputStyle}
                        pattern="[0-9]{11}"
                        required
                    />
                </div>

                <div>
                    <label
                        className="
                            block
                            mb-2
                            font-semibold
                            text-dark
                            dark:text-light
                        "
                    >
                        Message
                    </label>

                    <textarea
                        rows="6"
                        placeholder="Write your message..."
                        className={`${inputStyle} resize-none`}
                        minLength={10}
                        maxLength={300}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="
                        w-full
                        md:w-auto
                        px-8
                        py-3
                        rounded-xl
                        bg-primary
                        text-white
                        font-semibold
                        hover:opacity-90
                        transition
                        cursor-pointer
                    "
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;