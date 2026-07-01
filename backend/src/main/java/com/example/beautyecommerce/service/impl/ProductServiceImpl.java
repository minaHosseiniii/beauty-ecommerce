package com.example.cosmeticstore.service.impl;

import com.example.cosmeticstore.dto.ProductDTO;
import com.example.cosmeticstore.mapper.ProductMapper;
import com.example.cosmeticstore.repository.ProductRepository;
import com.example.cosmeticstore.service.ProductService;
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
