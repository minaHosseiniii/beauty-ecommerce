package com.example.beautyecommerce.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDTO {
    private String name;
    private String email;
    private String mobileNumber;
    private List<AddressDTO> addressList;
    private Boolean emailUpdated;
}
