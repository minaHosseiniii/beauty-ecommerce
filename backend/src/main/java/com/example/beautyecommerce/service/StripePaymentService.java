package com.example.beautyecommerce.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface StripePaymentService {
    public PaymentIntent createPaymentIntent(long amount, String currency) throws StripeException;
}
