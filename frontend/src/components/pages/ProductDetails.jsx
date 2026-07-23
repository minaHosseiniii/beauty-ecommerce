import { useLoaderData } from "react-router-dom";
import ErrorMessage from "../ui/ErrorMessage.jsx";
import Price from "./Price.jsx";
import useCart from "../../store/hooks/UseCart.jsx";

const ProductDetails = () => {
    const { product, error } = useLoaderData();
    const { addToCart } = useCart();

    if (error) {
        return <ErrorMessage message={error} />;
    }

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    return (
        <div
            className="
        max-w-6xl
        mx-auto
        px-6
        py-16
      "
        >
            <div
                className="
          grid
          md:grid-cols-2
          gap-12
          items-stretch
        "
            >
                {/* Product Image */}
                <div className="h-full">
                    <img
                        src={`/${product.imageUrl}`}
                        alt={product.name}
                        className="
              w-full
              h-full
              rounded-3xl
              object-cover
              shadow-lg
            "
                    />
                </div>

                {/* Product Info */}
                <div
                    className="
            flex
            flex-col
            h-full
          "
                >
                    <div>
                        <h1
                            className="
                text-4xl
                font-bold
                text-dark
                dark:text-light
                mb-6
              "
                        >
                            {product.name}
                        </h1>

                        <p
                            className="
                text-gray-600
                dark:text-gray-300
                leading-8
              "
                        >
                            {product.description}
                        </p>
                    </div>

                    <div
                        className="
                             mt-auto
                             pt-8
                             flex
                             items-center
                             gap-8">
                        <Price
                            currency="$"
                            price={product.price}
                        />

                        <button
                            onClick={handleAddToCart}
                            className="
                                px-8
                                py-3
                                rounded-xl
                                bg-primary
                                text-white
                                font-semibold
                                transition-all
                                duration-300
                                hover:bg-dark
                                dark:hover:bg-[#5D764C]
                                hover:shadow-lg">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;