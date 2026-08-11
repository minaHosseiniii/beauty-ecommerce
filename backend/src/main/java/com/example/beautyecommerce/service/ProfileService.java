package com.example.beautyecommerce.service;

import com.example.beautyecommerce.dto.ProfileRequestDTO;
import com.example.beautyecommerce.dto.ProfileResponseDTO;

public interface ProfileService {
    ProfileResponseDTO getProfile();
    ProfileResponseDTO updateProfile(ProfileRequestDTO profileRequestDTO);
}
