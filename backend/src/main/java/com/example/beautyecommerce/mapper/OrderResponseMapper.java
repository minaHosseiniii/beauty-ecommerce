package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.OrderResponseDTO;
import com.example.beautyecommerce.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = OrderItemResponseMapper.class)
public interface OrderResponseMapper {
    @Mapping(source = "items", target = "orderItems")
    OrderResponseDTO toOrderResponseDTO(Order order);
}
