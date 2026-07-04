import Price from "./Price";

export default function ProductCard({ product }) {
    return (
        <div
            className="
                group
                mx-auto
                w-72
                overflow-hidden
                rounded-2xl
                border
                border-stone-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            <div className="relative h-72 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />
            </div>

            <div className="flex h-52 flex-col p-5 font-primary">
                <h2 className="mb-2 text-xl font-bold text-dark">
                    {product.name}
                </h2>

                <p className="mb-5 line-clamp-3 text-sm leading-6 text-stone-600">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <Price
                        currency="$"
                        price={product.price}
                    />

                    <button
                        className="
                            rounded-lg
                            bg-primary
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition
                            duration-300
                            hover:bg-dark
                        "
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}