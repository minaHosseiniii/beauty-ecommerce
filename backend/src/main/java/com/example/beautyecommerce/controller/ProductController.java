package com.example.beautyecommerce.controller;

import com.example.beautyecommerce.dto.ProductDTO;
import com.example.beautyecommerce.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(
        name = "Products",
        description = "Product management APIs"
)
@Validated
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "Get all products",
            description = "Returns a list of all available products."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Products retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts() {

        return ResponseEntity.ok(productService.findAll());
    }

    @Operation(
            summary = "Get product by id",
            description = "Returns a single product by its unique identifier."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Product found"),
            @ApiResponse(
                    responseCode = "404",
                    description = "Product not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(
            @Parameter(
                    description = "Product identifier",
                    example = "1")
            @PathVariable @Min(1) Long id) {

        return ResponseEntity.ok(productService.findById(id));
    }
}
