package com.example.beautyecommerce.service;

import com.example.beautyecommerce.dto.OrderDTO;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO findById(Long id);
}
