package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.AddressDTO;
import com.example.beautyecommerce.entity.Address;
import com.example.beautyecommerce.entity.Customer;
import com.example.beautyecommerce.mapper.AddressMapper;
import com.example.beautyecommerce.repository.AddressRepository;
import com.example.beautyecommerce.service.AddressService;
import com.example.beautyecommerce.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressMapper addressMapper;
    private final AddressRepository addressRepository;
    private final CustomerService customerService;

    @Override
    @Transactional
    public AddressDTO createAddress(AddressDTO addressDTO) {
        Address address = addressMapper.toAddress(addressDTO);
        Customer authenticatedCustomer = customerService.getAuthenticatedCustomer();
        address.setCustomer(authenticatedCustomer);
        Address savedAddress = addressRepository.save(address);
        return addressMapper.toAddressDTO(savedAddress);
    }

    @Override
    public List<Address> findByCustomerId(Long customerId) {
        return addressRepository.findByCustomer_CustomerId(customerId);
    }

    @Override
    @Transactional
    public void updateAddress(AddressDTO addressDTO) {
        Customer customer = customerService.getAuthenticatedCustomer();

        Optional<Address> currentAddress = addressRepository
                .findByIdAndCustomer_CustomerId(addressDTO.getId(), customer.getCustomerId());

        if (currentAddress.isPresent()) {
            Address address = currentAddress.get();
            address.setCity(addressDTO.getCity());
            address.setCountry(addressDTO.getCountry());
            address.setState(addressDTO.getState());
            address.setStreet(addressDTO.getStreet());
            address.setPostalCode(addressDTO.getPostalCode());
            address.setCustomer(address.getCustomer());
        }

    }

    @Override
    @Transactional
    public void deleteAddress(Long id) {
        Customer customer = customerService.getAuthenticatedCustomer();
        addressRepository.findByIdAndCustomer_CustomerId(id, customer.getCustomerId())
                .ifPresent(addressRepository::delete);

    }
}
