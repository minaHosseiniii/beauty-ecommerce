package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.ProductDTO;
import com.example.beautyecommerce.mapper.ProductMapper;
import com.example.beautyecommerce.repository.ProductRepository;
import com.example.beautyecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    @Override
    public List<ProductDTO> findAll() {
        return productMapper.toProductDTOList(productRepository.findAll());
    }
}
