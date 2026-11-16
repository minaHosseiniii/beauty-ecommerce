package com.example.beautyecommerce.controller;

import com.example.beautyecommerce.dto.OrderResponseDTO;
import com.example.beautyecommerce.entity.OrderStatus;
import com.example.beautyecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final OrderService orderService;

    @GetMapping("/dashboard")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("Welcome Admin");
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDTO>> findAllCreatedOrders() {
        return ResponseEntity.ok(orderService.findAllCreatedOrders());
    }

    @PatchMapping("/orders/{id}/confirm")
    public ResponseEntity<OrderResponseDTO> confirmOrder(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(orderService.updateOrderStatus(id, OrderStatus.CONFIRMED));
    }

    @PatchMapping("/orders/{id}/cancel")
    public ResponseEntity<OrderResponseDTO> cancelOrder(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(orderService.updateOrderStatus(id, OrderStatus.CANCELLED));
    }
}
