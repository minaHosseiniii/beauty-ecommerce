package com.example.beautyecommerce.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Product information")
public class ProductDTO {

    @Schema(description = "Unique product id",
            example = "1",
            accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Product name",
            example = "Vitamin C Serum")
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50)
    private String name;

    @Schema(description = "Product description",
            example = "Brightening serum with Vitamin C")
    @NotBlank(message = "Invalid email address")
    @Size(max = 2000)
    private String description;

    @Schema(description = "Product price",
            example = "29.99")
    @Positive
    private BigDecimal price;

    @Schema(description = "Popularity score",
            example = "85")
    @PositiveOrZero
    private int popularity;

    @Schema(description = "Product image URL",
            example = "https://cdn.myshop.com/images/vitamin-c.jpg")
    private String imageUrl;

    @Schema(description = "Creation timestamp",
            accessMode = Schema.AccessMode.READ_ONLY,
            example = "2026-07-18T08:30:00Z")
    private Instant createdAt;
}
