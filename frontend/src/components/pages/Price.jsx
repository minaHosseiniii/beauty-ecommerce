export default function Price({ currency, price }) {
    return (
        <div
            className="
                inline-flex
                items-center
                gap-1
                px-3
                py-1.5
                rounded-lg
                border
                border-primary/20
                bg-white
                dark:bg-[#171A16]
                text-primary
                font-bold
                text-lg
                transition-all
                duration-300
            ">
            <span className="text-sm">
                {currency}
            </span>

            <span>
                {price}
            </span>
        </div>
    );
}