package com.example.cosmeticstore.repository;

import com.example.cosmeticstore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
