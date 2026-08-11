package com.example.beautyecommerce.controller;

import com.example.beautyecommerce.dto.ProfileRequestDTO;
import com.example.beautyecommerce.dto.ProfileResponseDTO;
import com.example.beautyecommerce.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponseDTO> getProfile() {
        return ResponseEntity.ok(profileService.getProfile());
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDTO> updateProfile(@Valid @RequestBody ProfileRequestDTO profileRequestDTO) {
        return ResponseEntity.ok(profileService.updateProfile(profileRequestDTO));
    }
}
