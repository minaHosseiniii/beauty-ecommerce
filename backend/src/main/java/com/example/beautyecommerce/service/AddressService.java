package com.example.beautyecommerce.service;

import com.example.beautyecommerce.dto.AddressDTO;
import com.example.beautyecommerce.entity.Address;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO);
    List<Address> findByCustomerId(Long customerId);
    void updateAddress(AddressDTO addressDTO);
    void deleteAddress(Long id);
}
