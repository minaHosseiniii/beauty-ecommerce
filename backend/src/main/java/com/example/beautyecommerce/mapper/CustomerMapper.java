package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.CustomerDTO;
import com.example.beautyecommerce.dto.RegisterRequestDTO;
import com.example.beautyecommerce.entity.Customer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDTO toCustomerDTO(Customer customer);

    Customer toCustomer(CustomerDTO customerDTO);

    Customer toCustomer(RegisterRequestDTO registerRequestDTO);

    List<CustomerDTO> toCustomerDTOList(List<Customer> customers);
}
