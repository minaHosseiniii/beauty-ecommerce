import productService from "../api/product.service.js";

export async function productsDetailsLoader({params}) {
    try {
        const response = await productService.getById(params.productId);
        return {
            product: response.data,
            error: null
        }
    }catch (error) {
        return {
            product: null,
            error: error?.response?.data?.message ?? "Failed to fetch product."
        }
    }

}