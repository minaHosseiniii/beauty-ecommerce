package com.example.beautyecommerce.repository;

import com.example.beautyecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Boolean existsByEmail(String email);

    Boolean existsByMobileNumber(String mobileNumber);

    Optional<Customer> findByEmail(String email);
}
