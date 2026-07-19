package com.example.beautyecommerce.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Contact request")
public class ContactDTO {

    @Schema(description = "Customer full name",
            example = "Zahra Abdi")
    @NotBlank
    private String name;

    @Schema(description = "Customer message",
            example = "I would like to know more about your products.")
    @Size(min = 4, max = 500)
    private String message;

    @Schema(description = "Mobile number",
            example = "09123456789")
    @Pattern(
            regexp = "^09\\d{9}$",
            message = "Mobile number must be a valid Iranian mobile number")
    private String mobileNumber;

    @Schema(description = "Email address",
            example = "abdi@gmail.com")
    @Email(message = "Invalid email address")
    private String email;
}
