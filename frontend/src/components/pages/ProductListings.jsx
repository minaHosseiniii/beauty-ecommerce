import ProductCard from "./ProductCard.jsx";
import SearchBox from "./SearchBox.jsx";
import DropDown from "./DropDown.jsx";
import {useMemo, useState} from "react";

export default function ProductListings({products}) {
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("Popularity");
    const sortList = [
        "Popularity",
        "Price Low to High",
        "Price High to Low",
    ];


    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    }

    const filteredAndSortProducts = useMemo(() => {
        const search = searchText.toLowerCase();
        const filteredProducts = Array.isArray(products)
            ? products.filter((product) =>
                (product.name ?? "")
                    .toLowerCase()
                    .includes(search) ||
                (product.description ?? "")
                    .toLowerCase()
                    .includes(search)
            )
            : [];

        let sortedProducts = [...filteredProducts];

        switch (selectedSort) {
            case "Price Low to High":
                sortedProducts.sort(
                    (a, b) => parseFloat(a.price) - parseFloat(b.price)
                );
                break;

            case "Price High to Low":
                sortedProducts.sort(
                    (a, b) => parseFloat(b.price) - parseFloat(a.price)
                );
                break;

            case "Popularity":
            default:
                sortedProducts.sort(
                    (a, b) => b.popularity - a.popularity
                );
        }
        return sortedProducts;
    }, [products, searchText, selectedSort]);


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
        dark:border-[#2B3328]
        bg-white/70
        dark:bg-[#222820]/70
        p-6
        shadow-sm
        dark:shadow-black/30
        backdrop-blur-sm
        transition-all
        duration-300
        md:flex-row
        md:items-center
        md:justify-between
    ">
                <SearchBox
                    label="Search"
                    placeholder="Search products..."
                    value={searchText}
                    handleSearch={handleSearchChange}
                />

                <DropDown
                    label="Sort By"
                    options={sortList}
                    selectedValue={selectedSort}
                    handleSort={handleSortChange}

                />
            </div>

            {filteredAndSortProducts.length > 0 ? (
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-8
                        sm:grid-cols-2
                        lg:grid-cols-3">

                    {filteredAndSortProducts?.map((product) => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <p
                        className="
        font-primary
        text-xl
        font-semibold
        text-stone-500
        dark:text-[#C8CCBF]
        transition-colors
        duration-300
    ">
                        No products found.
                    </p>
                </div>
            )}

        </section>
    );
}