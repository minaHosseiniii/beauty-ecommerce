import {useContext} from "react";
import CartContext from "../contexts/CartContext.jsx";

const UseCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider")
    }

    return context;
}

export default UseCart;