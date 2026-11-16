package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.AddressDTO;
import com.example.beautyecommerce.entity.Address;
import com.example.beautyecommerce.entity.ShippingAddress;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShippingAddressMapper {
    ShippingAddress toShippingAddress(AddressDTO addressDTO);
    AddressDTO toAddressDTO(ShippingAddress shippingAddress);
    ShippingAddress toShippingAddress(Address address);
}
