package com.example.cosmeticstore.service;

import com.example.cosmeticstore.dto.ProductDTO;
import com.example.cosmeticstore.entity.Product;

import java.util.List;

public interface ProductService {
    List<ProductDTO> findAll();
}
