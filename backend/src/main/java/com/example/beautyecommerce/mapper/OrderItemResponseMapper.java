package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.OrderItemResponseDTO;
import com.example.beautyecommerce.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemResponseMapper {
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.imageUrl", target = "imageUrl")
    OrderItemResponseDTO toOrderItemResponseDTO(OrderItem orderItem);
}
