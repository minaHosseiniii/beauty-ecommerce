package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.OrderDTO;
import com.example.beautyecommerce.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
     Order toOrder(OrderDTO orderDTO);

     OrderDTO toOrderDTO(Order order);
}
