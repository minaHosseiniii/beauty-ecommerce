import Price from "./Price";

export default function ProductCard({product}) {
    return (
        <div className="w-72 rounded-md mx-auto border border-gray-300 shadow-md overflow-hidden flex
        flex-col bg-white hover:shadow-lg transition">
            <div className="relative w-full h-72 border-b border-gray-300">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    src={product.imageUrl}
                    alt={product.name}/>
            </div>
            <div className="relative h-48 p-4 flex flex-col font-primary">
                <h2 className="text-xl font-semibold text-primary mb-2">{product.name}</h2>
                <p className="text-base text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center justify-between mt-auto">
                        <Price currency="$" price={product.price}/>
                    </div>
                </div>
            </div>
        </div>
    );
}