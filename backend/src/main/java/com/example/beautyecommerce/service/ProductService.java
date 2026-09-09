package com.example.beautyecommerce.service;

import com.example.beautyecommerce.dto.ProductDTO;
import com.example.beautyecommerce.entity.Product;

import java.util.List;

public interface ProductService {
    ProductDTO findById(Long id);
    Product getProductById(Long id);
    List<ProductDTO> findAll();
}
