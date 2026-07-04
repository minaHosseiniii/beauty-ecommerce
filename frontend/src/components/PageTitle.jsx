export default function PageTitle({ title }) {
    return (
        <div className="flex flex-col items-center mb-6">
            <span className="text-primary uppercase tracking-[0.35em] text-xs font-semibold mb-2">
                Natural • Organic • Luxury
            </span>

            <h1
                className="
                    text-4xl
                    md:text-5xl
                    font-primary
                    font-bold
                    text-dark
                    text-center
                    tracking-wide
                "
            >
                {title}
            </h1>

            <div className="w-24 h-1 bg-primary rounded-full mt-5"></div>
        </div>
    );
}