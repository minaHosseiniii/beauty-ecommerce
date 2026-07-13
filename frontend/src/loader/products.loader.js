

import productService from "../api/product.service";

export async function productsLoader() {
    try {
        const response = await productService.getAll();

        return {
            products: response.data,
            error: null
        };
    } catch (error) {
        return {
            products: [],
            error:
                error.response?.data?.message ??
                "Failed to fetch products."
        };
    }
}