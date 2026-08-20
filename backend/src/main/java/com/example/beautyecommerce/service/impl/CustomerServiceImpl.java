package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.CustomerDTO;
import com.example.beautyecommerce.dto.RegisterRequestDTO;
import com.example.beautyecommerce.entity.Customer;
import com.example.beautyecommerce.entity.Role;
import com.example.beautyecommerce.exceptions.ValidationException;
import com.example.beautyecommerce.mapper.CustomerMapper;
import com.example.beautyecommerce.repository.CustomerRepository;
import com.example.beautyecommerce.service.CustomerService;
import com.example.beautyecommerce.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final PasswordEncoder passwordEncoder;
    private final CompromisedPasswordChecker passwordChecker;
    private final RoleService roleService;


    @Override
    public CustomerDTO saveCustomer(RegisterRequestDTO dto) {
        CompromisedPasswordDecision decision = passwordChecker.check(dto.getPassword());
        Map<String, String> validationErrors = new HashMap<>();

        if (customerRepository.existsByMobileNumber(dto.getMobileNumber())) {
            validationErrors.put("mobileNumber", "MobileNumber is already in use");
        }
        if (customerRepository.existsByEmail(dto.getEmail())) {
            validationErrors.put("email", "Email is already in use");
        }

        try {
            if (decision.isCompromised()) {
                validationErrors.put("password", "Choose a stronger password");
            }
        } catch (Exception ex) {
            log.warn("Password compromise service unavailable", ex);
        }

        if (!validationErrors.isEmpty()) {
            throw new ValidationException(validationErrors);
        }

        Role roleUser = roleService.findByRoleName("ROLE_USER");
        var newCustomer = customerMapper.toCustomer(dto);
        newCustomer.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        newCustomer.setRoles(Set.of(roleUser));
        return customerMapper.toCustomerDTO(customerRepository.save(newCustomer));
    }

    @Override
    public Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return customerRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found"));

        customer.setName(dto.getName());
        customer.setEmail(dto.getEmail());
        customer.setMobileNumber(dto.getMobileNumber());

        return customerMapper.toCustomerDTO(customer);
    }
}
