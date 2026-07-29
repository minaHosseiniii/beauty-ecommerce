package com.example.beautyecommerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    @NotBlank
    @Size(min = 3, max = 20)
    private String name;
    @NotBlank
    @Size(min = 8, max = 20)
    private String password;
    @NotBlank
    @Pattern(
            regexp = "^09\\d{9}$",
            message = "Mobile number must be a valid Iranian mobile number")
    private String mobileNumber;
    @NotBlank
    @Email
    private String email;
}
