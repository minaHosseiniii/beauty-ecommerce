import { useEffect, useMemo, useReducer } from "react";

import CartContext from "../contexts/CartContext";

import { cartReducer } from "../reducers/cartReducer";

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
} from "../actions/cartActionTypes";

const CartProvider = ({ children }) => {

    const initialCartState = (() => {
        try {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            return [];
        }
    })();

    const [cart, dispatch] = useReducer(
        cartReducer,
        initialCartState
    );

    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }, [cart]);

    const addToCart = (product, quantity = 1) => {

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product,
                quantity,
            },
        });

    };

    const removeFromCart = (id) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: { id },
        });
    };
    const clearCart = () => {

        dispatch({
            type: CLEAR_CART,
        });

    };

    const totalQuantity = useMemo(() => {

        return cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

    }, [cart]);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;