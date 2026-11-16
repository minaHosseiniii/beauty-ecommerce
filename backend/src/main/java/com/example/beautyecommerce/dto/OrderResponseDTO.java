package com.example.beautyecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private String paymentStatus;
    private BigDecimal totalPrice;
    private Instant createdAt;
    private List<OrderItemResponseDTO> orderItems;
}
