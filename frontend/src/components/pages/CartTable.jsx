import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import useCart from "../../store/hooks/UseCart";

const CartTable = () => {
    const {
        cart,
        addToCart,
        removeFromCart,
    } = useCart();

    const subtotal = cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

    const updateCartQuantity = (id, quantity) => {
        const product = cart.find(item => item.id === id);

        if (!product) return;

        addToCart(
            product,
            quantity - product.quantity
        );
    };

    return (
        <div
            className="
                overflow-hidden
                rounded-3xl
                border
                border-stone-200
                dark:border-[#2E342B]
                bg-white
                dark:bg-[#20231F]
                shadow-xl
            "
        >
            <table className="w-full">

                <thead
                    className="
                        bg-primary
                        text-white
                    "
                >
                <tr>
                    <th className="p-5 text-left">Product</th>
                    <th className="p-5 text-center">Quantity</th>
                    <th className="p-5 text-center">Price</th>
                    <th className="p-5 text-center">Remove</th>
                </tr>
                </thead>

                <tbody>

                {cart.map(item => (

                    <tr
                        key={item.id}
                        className="
                                border-b
                                border-stone-200
                                dark:border-[#31382F]
                                hover:bg-stone-50
                                dark:hover:bg-[#262B25]
                                transition-colors
                            "
                    >

                        <td className="p-5">

                            <Link
                                to={`/products/${item.id}`}
                                state={{ product: item }}
                                className="flex items-center gap-5"
                            >

                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="
                                            h-24
                                            w-24
                                            rounded-xl
                                            object-cover
                                        "
                                />

                                <h3
                                    className="
                                            text-lg
                                            font-semibold
                                            text-stone-800
                                            dark:text-stone-100
                                        "
                                >
                                    {item.name}
                                </h3>

                            </Link>

                        </td>

                        <td className="text-center">

                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    updateCartQuantity(
                                        item.id,
                                        Number(e.target.value)
                                    )
                                }
                                className="
                                        w-20
                                        rounded-lg
                                        border
                                        border-stone-300
                                        dark:border-[#3B4437]
                                        bg-white
                                        dark:bg-[#161A17]
                                        py-2
                                        text-center
                                        text-stone-800
                                        dark:text-white
                                        focus:border-primary
                                        outline-none
                                    "
                            />

                        </td>

                        <td
                            className="
                                    text-center
                                    font-bold
                                    text-primary
                                    dark:text-[#9BC57C]
                                "
                        >
                            $
                            {(item.price * item.quantity).toFixed(2)}
                        </td>

                        <td className="text-center">

                            <button
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                                className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-red-500/15
                                        text-red-400
                                        transition-all
                                        hover:bg-red-500
                                        hover:text-white
                                    "
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-stone-200
                    dark:border-[#31382F]
                    bg-stone-50
                    dark:bg-[#171A16]
                    px-8
                    py-6
                "
            >
                <h3
                    className="
                        text-xl
                        font-bold
                        text-stone-800
                        dark:text-stone-100
                    "
                >
                    Subtotal
                </h3>

                <span
                    className="
                        text-3xl
                        font-bold
                        text-primary
                        dark:text-[#A8D48B]
                    "
                >
                    ${subtotal}
                </span>
            </div>
        </div>
    );
};

export default CartTable;