package com.example.beautyecommerce.repository;

import com.example.beautyecommerce.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
