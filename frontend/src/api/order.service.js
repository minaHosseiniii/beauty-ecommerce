import apiClient from "./api-client.js";

export const createOrder = async (orderData) => {
    const response = await apiClient.post("/orders", orderData);

    return response.data;
};

export const getOrderById = async (id) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
};

export const getCustomerOrders = async () => {
    const response = await apiClient.get("/orders");
    return response.data;
};

export const getAllCreatedOrders = async () => {
    const response = await apiClient.get("/admin/orders");
    return response.data;
};

export const confirmOrder = async (id) => {
    const response = await apiClient.patch(`/admin/orders/${id}/confirm`);
    return response.data;
};

export const cancelOrder = async (id) => {
    const response = await apiClient.patch(`/admin/orders/${id}/cancel`);
    return response.data;
};