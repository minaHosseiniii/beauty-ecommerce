import apiClient from "./api-client.js";

export const createOrder = async (orderData) => {
    const response = await apiClient.post("/orders", orderData);

    return response.data;
}

export const getOrderById = async (id) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
}