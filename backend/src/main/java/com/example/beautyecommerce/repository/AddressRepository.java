package com.example.beautyecommerce.repository;

import com.example.beautyecommerce.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByCustomer_CustomerId(Long customerId);
    Optional<Address> findByIdAndCustomer_CustomerId(Long addressId, Long customerId);
}
