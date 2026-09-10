package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.OrderDTO;
import com.example.beautyecommerce.dto.OrderItemDTO;
import com.example.beautyecommerce.entity.Customer;
import com.example.beautyecommerce.entity.Order;
import com.example.beautyecommerce.entity.OrderItem;
import com.example.beautyecommerce.entity.Product;
import com.example.beautyecommerce.exceptions.ValidationException;
import com.example.beautyecommerce.mapper.OrderMapper;
import com.example.beautyecommerce.repository.OrderRepository;
import com.example.beautyecommerce.service.CustomerService;
import com.example.beautyecommerce.service.OrderService;
import com.example.beautyecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final CustomerService customerService;
    private final ProductService productService;

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Customer customer = customerService.getAuthenticatedCustomer();
        Order order = orderMapper.toOrder(orderDTO);
        order.setCustomer(customer);
        ArrayList<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDTO orderItemDTO : orderDTO.getItems()) {
            Product productById = productService.getProductById(orderItemDTO.getProductId());
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(productById);
            orderItem.setQuantity(orderItemDTO.getQuantity());
            orderItem.setOrder(order);
            orderItem.setPrice(orderItemDTO.getPrice());
            orderItems.add(orderItem);
        }
        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toOrderDTO(savedOrder);
    }

    @Override
    public OrderDTO findById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return orderMapper.toOrderDTO(order);
    }
}
