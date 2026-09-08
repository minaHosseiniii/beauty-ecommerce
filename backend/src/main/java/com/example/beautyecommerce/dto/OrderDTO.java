package com.example.beautyecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Long id;
    private CustomerDTO customer;
    private BigDecimal totalPrice;
    private String paymentId;
    private String paymentStatus;
    private Instant createdAt;
}
