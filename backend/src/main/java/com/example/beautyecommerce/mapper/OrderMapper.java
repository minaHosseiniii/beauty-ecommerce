package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.OrderDTO;
import com.example.beautyecommerce.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    public Order toOrder(OrderDTO orderDTO);

    public OrderDTO toOrderDTO(Order order);
}
