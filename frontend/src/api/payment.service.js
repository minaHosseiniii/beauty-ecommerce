import apiClient from "./api-client";

export const createPaymentIntent = async (amount, currency = "usd") => {

    const response = await apiClient.post(
        "/payments/create-intent",
        {
            amount,
            currency,
        }
    );

    return response.data;
};