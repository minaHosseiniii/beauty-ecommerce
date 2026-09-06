package com.example.beautyecommerce.controller;

import com.example.beautyecommerce.dto.PaymentRequestDTO;
import com.example.beautyecommerce.service.StripePaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Validated
public class PaymentController {
    private final StripePaymentService stripePaymentService;

    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody @Valid PaymentRequestDTO dto) throws StripeException {
        System.out.println(">>> PAYMENT CONTROLLER REACHED");
        PaymentIntent paymentIntent = stripePaymentService.createPaymentIntent(dto.getAmount(), dto.getCurrency());
        return ResponseEntity.ok(Map.of("clientSecret", paymentIntent.getClientSecret()));
    }
}
