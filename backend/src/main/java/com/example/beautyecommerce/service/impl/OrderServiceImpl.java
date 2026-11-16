package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.OrderDTO;
import com.example.beautyecommerce.dto.OrderItemDTO;
import com.example.beautyecommerce.dto.OrderResponseDTO;
import com.example.beautyecommerce.entity.*;
import com.example.beautyecommerce.exceptions.ResourceNotFoundException;
import com.example.beautyecommerce.mapper.OrderMapper;
import com.example.beautyecommerce.mapper.OrderResponseMapper;
import com.example.beautyecommerce.mapper.ShippingAddressMapper;
import com.example.beautyecommerce.repository.OrderRepository;
import com.example.beautyecommerce.service.AddressService;
import com.example.beautyecommerce.service.CustomerService;
import com.example.beautyecommerce.service.OrderService;
import com.example.beautyecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderMapper orderMapper;
    private final OrderRepository orderRepository;
    private final CustomerService customerService;
    private final ProductService productService;
    private final AddressService addressService;
    private final OrderResponseMapper orderResponseMapper;
    private final ShippingAddressMapper shippingAddressMapper;


    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Customer customer = customerService.getAuthenticatedCustomer();
        Address selectedAddress = addressService.findByIdAndCustomerId(orderDTO.getSelectedAddressId(), customer.getCustomerId());

        Order order = orderMapper.toOrder(orderDTO);
        order.setCustomer(customer);
        order.setOrderStatus(OrderStatus.CREATED);

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

        ShippingAddress shippingAddress = shippingAddressMapper.toShippingAddress(selectedAddress);
        order.setShippingAddress(shippingAddress);

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toOrderDTO(savedOrder);
    }

    @Override
    public OrderDTO findById(Long id) {
        Order order = orderRepository.findByIdWithItemsAndProducts(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return orderMapper.toOrderDTO(order);
    }

    @Override
    public List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer) {
        return orderRepository.findByCustomerOrderByCreatedAtDesc(customer);
    }

    @Override
    public List<OrderResponseDTO> findCustomerOrders() {
        Customer authenticatedCustomer = customerService.getAuthenticatedCustomer();
        return findByCustomerOrderByCreatedAtDesc(authenticatedCustomer).stream()
                .map(orderResponseMapper::toOrderResponseDTO)
                .toList();
    }

    @Override
    public List<OrderResponseDTO> findAllCreatedOrders() {
        return orderRepository.findByOrderStatus(OrderStatus.CREATED)
                .stream()
                .map(orderResponseMapper::toOrderResponseDTO)
                .toList();
    }

    @Override
    public OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        order.setOrderStatus(orderStatus);
        return orderResponseMapper.toOrderResponseDTO(order);
    }
}
