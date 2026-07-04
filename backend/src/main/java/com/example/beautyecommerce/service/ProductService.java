package com.example.beautyecommerce.service;

import com.example.beautyecommerce.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> findAll();
}
