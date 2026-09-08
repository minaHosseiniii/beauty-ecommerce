package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.OrderItemDTO;
import com.example.beautyecommerce.entity.OrderItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    public OrderItem toOrderItem(OrderItemDTO orderItemDTO);
    public OrderItemDTO toOrderItemDTO(OrderItem orderItem);
}
