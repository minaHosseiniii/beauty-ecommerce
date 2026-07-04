import ProductCard from "./ProductCard";
import SearchBox from "./SearchBox";
import DropDown from "./DropDown";

export default function ProductListings({ products }) {
    const sortList = [
        "Popularity",
        "Price Low to High",
        "Price High to Low",
    ];

    return (
        <section className="max-w-6xl mx-auto">

            <div
                className="
                    mb-10
                    flex
                    flex-col
                    gap-5
                    rounded-2xl
                    border
                    border-stone-200
                    bg-white/70
                    p-6
                    shadow-sm
                    backdrop-blur-sm
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <SearchBox
                    label="Search"
                    placeholder="Search products..."
                    value=""
                />

                <DropDown
                    label="Sort By"
                    options={sortList}
                    selectedValue="Popularity"
                />
            </div>

            {products?.length > 0 ? (
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-8
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <p className="font-primary text-xl font-semibold text-stone-500">
                        No products found.
                    </p>
                </div>
            )}

        </section>
    );
}