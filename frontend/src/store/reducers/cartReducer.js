import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
} from "../actions/cartActionTypes";

export const cartReducer = (state, action) => {
    switch (action.type) {

        case ADD_TO_CART: {

            const { product, quantity } = action.payload;

            const existingItem = state.find(
                item => item.id === product.id
            );

            if (existingItem) {
                return state.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [
                ...state,
                {
                    ...product,
                    quantity,
                },
            ];
        }

        case REMOVE_FROM_CART:

            return state.filter(
                item => item.id !== action.payload.id
            );

        case CLEAR_CART:

            return [];

        default:
            return state;
    }
};