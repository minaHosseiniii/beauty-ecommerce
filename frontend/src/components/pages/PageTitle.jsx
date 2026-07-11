export default function PageTitle({ title }) {
    return (
        <div className="flex flex-col items-center mb-6">
            <span
                className="
                    text-primary
                    dark:text-primary
                    uppercase
                    tracking-[0.35em]
                    text-xs
                    font-semibold
                    mb-2
                    transition-colors
                    duration-300
                "
            >
                Natural • Organic • Luxury
            </span>

            <h1
                className="
                    text-4xl
                    md:text-5xl
                    font-primary
                    font-bold
                    text-dark
                    dark:text-[#E9E6DD]
                    text-center
                    tracking-wide
                    transition-colors
                    duration-300
                "
            >
                {title}
            </h1>

            <div
                className="
                    w-24
                    h-1
                    bg-primary
                    rounded-full
                    mt-5
                    transition-colors
                    duration-300
                "
            />
        </div>
    );
}