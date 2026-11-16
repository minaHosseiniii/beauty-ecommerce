package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.ProductDTO;
import com.example.beautyecommerce.entity.Product;
import com.example.beautyecommerce.exceptions.ResourceNotFoundException;
import com.example.beautyecommerce.mapper.ProductMapper;
import com.example.beautyecommerce.repository.ProductRepository;
import com.example.beautyecommerce.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    @Override
    public ProductDTO findById(Long id) {
        return productRepository
                .findById(id)
                .map(productMapper::toProductDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));
    }

    @Override
    public List<ProductDTO> findAll() {
        return productMapper.toProductDTOList(productRepository.findAll());
    }
}
