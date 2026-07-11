import PageTitle from "./PageTitle.jsx";

export default function PageHeading({ title, children }) {
    return (
        <section
            className="
                text-center
                py-10
                mb-10
                transition-colors
                duration-300
            "
        >
            <PageTitle title={title} />

            <div
                className="
                    mt-5
                    max-w-2xl
                    mx-auto
                    text-stone-600
                    dark:text-[#C8CCBF]
                    font-primary
                    text-lg
                    leading-8
                    tracking-wide
                    transition-colors
                    duration-300
                "
            >
                {children}
            </div>
        </section>
    );
}