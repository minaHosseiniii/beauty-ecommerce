import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import productService from "../api/product.service";
import {useEffect, useState} from "react";
import Loading from "./ui/Loading";
import ErrorMessage from "./ui/ErrorMessage";

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
            setError(error.response?.data?.message ?? "Failed to fetch products. Please try again.");
            console.error(error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (<Loading />);
    }
    
    if (error) {
        return (
           <ErrorMessage message={error} />
        );
    }
    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <PageHeading title="Aura Beauty Cosmetics">
                <p className="text-center max-w-xl mx-auto px-4 py-6">
                    Luxury skincare that nourishes your skin from within, designed for
                    radiant beauty and lasting results.
                </p>
            </PageHeading>
            <ProductListings products={products}/>
        </div>
    );
}