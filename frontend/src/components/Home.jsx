import {useEffect, useState} from "react";

import productService from "../api/product.service";

import ErrorMessage from "./ui/ErrorMessage";
import Loading from "./ui/Loading";

import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await productService.getAll();
            setProducts(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ??
                "Failed to fetch products. Please try again."
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <ErrorMessage message={error}/>;
    }

    return (
        <main
            className="
            rounded-3xl
            bg-light
            dark:bg-[#171A16]
            dark:border
            dark:border-[#2B3328]
            px-8
            py-12
            shadow-sm
            dark:shadow-black/30
            transition-colors
            duration-300
        "
        >
            <PageHeading title="Aura Beauty Cosmetics">
                <p
                    className="
                    mx-auto
                    mt-4
                    max-w-2xl
                    text-center
                    font-primary
                    text-lg
                    leading-8
                    text-stone-600
                    dark:text-[#C8CCBF]
                    transition-colors
                    duration-300
                "
                >
                    Discover luxury skincare crafted with natural ingredients,
                    designed to nourish your skin and reveal healthy, radiant
                    beauty every day.
                </p>
            </PageHeading>

            <ProductListings products={products}/>
        </main>
    );
}