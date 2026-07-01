package com.example.cosmeticstore.mapper;

import com.example.cosmeticstore.dto.ProductDTO;
import com.example.cosmeticstore.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toProductDTO(Product product);
    Product toProduct(ProductDTO productDTO);
    List<ProductDTO> toProductDTOList(List<Product> products);
}
