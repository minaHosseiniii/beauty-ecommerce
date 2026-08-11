package com.example.beautyecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private Long id;
    @NotBlank
    @Size(min = 5, max = 35)
    private String street;
    @NotBlank
    @Size(min = 3, max = 50)
    private String city;
    @NotBlank
    @Size(min = 3, max = 50)
    private String state;
    @NotBlank
    @Size(min = 3, max = 50)
    private String country;
    @NotBlank
    @Pattern(regexp = "\\d{10}")
    private String postalCode;
}
