package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.ProductDTO;
import com.example.beautyecommerce.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toProductDTO(Product product);
    Product toProduct(ProductDTO productDTO);
    List<ProductDTO> toProductDTOList(List<Product> products);
}
