package com.example.beautyecommerce.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.Instant;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponseDTO {
    private String message;
    private String apiPath;
    private HttpStatus errorCode;
    private Instant timestamp;
}
