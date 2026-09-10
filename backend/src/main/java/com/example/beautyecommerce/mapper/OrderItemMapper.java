package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.OrderItemDTO;
import com.example.beautyecommerce.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
     OrderItem toOrderItem(OrderItemDTO orderItemDTO);
     @Mapping(source = "product.id", target = "productId")
     @Mapping(source = "product.name", target = "productName")
     OrderItemDTO toOrderItemDTO(OrderItem orderItem);
}
