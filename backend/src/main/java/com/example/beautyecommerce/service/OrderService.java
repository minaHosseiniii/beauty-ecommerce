package com.example.beautyecommerce.service;

import com.example.beautyecommerce.dto.OrderDTO;
import com.example.beautyecommerce.dto.OrderResponseDTO;
import com.example.beautyecommerce.entity.Customer;
import com.example.beautyecommerce.entity.Order;
import com.example.beautyecommerce.entity.OrderStatus;

import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);

    OrderDTO findById(Long id);
    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);
    List<OrderResponseDTO> findCustomerOrders();
    List<OrderResponseDTO> findAllCreatedOrders();

    OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus orderStatus);
}
