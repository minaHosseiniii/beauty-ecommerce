package com.example.beautyecommerce.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerDTO {
    private Long customerId;
    private String name;
    private String email;
    private String mobileNumber;
}
