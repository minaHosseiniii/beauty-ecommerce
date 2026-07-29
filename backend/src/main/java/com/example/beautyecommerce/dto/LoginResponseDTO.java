package com.example.beautyecommerce.dto;

public record LoginResponseDTO(String token, String message, UserDTO user) {
}
