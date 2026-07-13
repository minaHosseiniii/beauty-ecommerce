import apiClient from "./api-client.js";

const API = "/products";
const productService = {
    getAll() {
        return apiClient.get(API);
    },

    getById(id) {
        return apiClient.get(`${API}/${id}`);
    }
}

export default productService;