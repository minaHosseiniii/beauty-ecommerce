import PageTitle from "../../components/pages/PageTitle.jsx";
import {useActionData, Form, useNavigation} from "react-router-dom";
import {useRef, useEffect, useState} from "react";

const inputStyle = `
  w-full
  px-4
  py-3
  rounded-xl
  border
  border-gray-300
  dark:border-white/10
  bg-white
  dark:bg-[#171A16]
  text-dark
  dark:text-light
  placeholder:text-gray-400
  shadow-sm
  focus:outline-none
  focus:ring-2
  focus:ring-primary
  transition-all
`;
const Contact = () => {
    const [flashMessage, setFlashMessage] = useState(null);
    const formRef = useRef(null);
    const  actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (actionData?.success) {
            formRef.current?.reset();
        }
    }, [actionData]);

    useEffect(() => {
        if (actionData?.message) {
            setFlashMessage(actionData);

            const timer = setTimeout(() => {
                setFlashMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [actionData]);

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

            {flashMessage?.message && (
                <div
                    className={`
            mb-6
            rounded-xl
            p-4
            ${
                        flashMessage.success
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    }
        `}
                >
                    {flashMessage.message}
                </div>
            )}

            <Form
                ref={formRef}
                method="post"
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
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        className={inputStyle}
                        minLength={4}
                        maxLength={20}
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
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        className={inputStyle}
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
                        ">
                        Mobile Number
                    </label>

                    <input
                        name="mobileNumber"
                        type="tel"
                        placeholder="09123456789"
                        className={inputStyle}
                        pattern="[0-9]{11}"
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
                        name="message"
                        rows="6"
                        placeholder="Write your message..."
                        className={`${inputStyle} resize-none`}
                        minLength={4}
                        maxLength={300}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
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
                        cursor-pointer">
                    {isSubmitting
                        ? "Sending..."
                        : "Send Message"}
                </button>
            </Form>
        </div>
    );
};

export default Contact;