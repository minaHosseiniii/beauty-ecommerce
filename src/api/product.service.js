import apiClient from "./api-client.js";
const productService = {
    getAll() {
        return apiClient.get("/products");
    }
}

export default productService;