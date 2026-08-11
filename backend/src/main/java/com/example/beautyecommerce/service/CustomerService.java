package com.example.beautyecommerce.service;

import com.example.beautyecommerce.dto.CustomerDTO;
import com.example.beautyecommerce.dto.RegisterRequestDTO;
import com.example.beautyecommerce.entity.Customer;

public interface CustomerService {
    CustomerDTO saveCustomer(RegisterRequestDTO dto);
    Customer getAuthenticatedCustomer();
    CustomerDTO updateCustomer(CustomerDTO dto);
}
