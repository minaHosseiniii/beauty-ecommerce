package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.AddressDTO;
import com.example.beautyecommerce.entity.Address;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address toAddress(AddressDTO addressDTO);
    AddressDTO toAddressDTO(Address address);

    List<AddressDTO> toAddressDTOList(List<Address> addressList);
}
