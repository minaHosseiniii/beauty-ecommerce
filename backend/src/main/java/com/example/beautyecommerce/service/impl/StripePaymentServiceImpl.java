package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.service.StripePaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripePaymentServiceImpl implements StripePaymentService {
    @Override
    public PaymentIntent createPaymentIntent(
            long amount,
            String currency
    ) throws StripeException {

        System.out.println(">>> BEFORE STRIPE");
        System.out.println(">>> amount = " + amount);
        System.out.println(">>> currency = " + currency);

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amount)
                        .setCurrency(currency)
                        .build();

        System.out.println(">>> PARAMS CREATED");

        PaymentIntent paymentIntent =
                PaymentIntent.create(params);

        System.out.println(">>> STRIPE RESPONSE RECEIVED");
        System.out.println(">>> PAYMENT INTENT ID = " + paymentIntent.getId());
        System.out.println(">>> PAYMENT INTENT AMOUNT = " + paymentIntent.getAmount());
        System.out.println(">>> PAYMENT INTENT STATUS = " + paymentIntent.getStatus());

        return paymentIntent;
    }
}
