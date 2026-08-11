package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.AddressDTO;
import com.example.beautyecommerce.dto.CustomerDTO;
import com.example.beautyecommerce.dto.ProfileRequestDTO;
import com.example.beautyecommerce.dto.ProfileResponseDTO;
import com.example.beautyecommerce.entity.Address;
import com.example.beautyecommerce.entity.Customer;
import com.example.beautyecommerce.mapper.AddressMapper;
import com.example.beautyecommerce.service.AddressService;
import com.example.beautyecommerce.service.CustomerService;
import com.example.beautyecommerce.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final CustomerService customerService;
    private final AddressMapper addressMapper;
    private final AddressService addressService;

    @Override
    public ProfileResponseDTO getProfile() {
        Customer authenticatedCustomer = customerService.getAuthenticatedCustomer();
        List<Address> addressList = addressService.findByCustomerId(authenticatedCustomer.getCustomerId());
        List<AddressDTO> addressDTOList = addressMapper.toAddressDTOList(addressList);
        return ProfileResponseDTO.builder()
                .name(authenticatedCustomer.getName())
                .mobileNumber(authenticatedCustomer.getMobileNumber())
                .email(authenticatedCustomer.getEmail())
                .addressList(addressDTOList)
                .build();
    }

    @Override
    @Transactional
    public ProfileResponseDTO updateProfile(ProfileRequestDTO dto) {
        Customer customer = customerService.getAuthenticatedCustomer();

        boolean emailIsUpdated = !customer.getEmail().equalsIgnoreCase(dto.getEmail());

        CustomerDTO customerDTO = CustomerDTO.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .mobileNumber(dto.getMobileNumber())
                .customerId(customer.getCustomerId())
                .build();
        customerService.updateCustomer(customerDTO);

        for (AddressDTO addressDTO : dto.getAddresses()) {
            if (addressDTO.getId() == null) {
                addressService.createAddress(addressDTO);
            } else {
                addressService.updateAddress(addressDTO);
            }
        }

        Set<Long> requestedAddressIds = dto.getAddresses().stream()
                .map(AddressDTO::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        for (Address address : customer.getAddresses()) {
            if (!requestedAddressIds.contains(address.getId())) {
                addressService.deleteAddress(address.getId());
            }
        }

        List<Address> customerAddressList = addressService.findByCustomerId(customer.getCustomerId());
        List<AddressDTO> customerAddressDTOList = addressMapper.toAddressDTOList(customerAddressList);

        return ProfileResponseDTO.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .mobileNumber(dto.getMobileNumber())
                .addressList(customerAddressDTOList)
                .emailUpdated(emailIsUpdated)
                .build();
    }
}
