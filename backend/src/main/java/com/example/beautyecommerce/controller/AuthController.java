package com.example.beautyecommerce.controller;

import com.example.beautyecommerce.configuration.security.JwtService;
import com.example.beautyecommerce.dto.*;
import com.example.beautyecommerce.entity.Customer;
import com.example.beautyecommerce.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomerService customerService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequestDTO.username(),
                loginRequestDTO.password()
        ));


        String token = jwtService.generateToken(authentication);
        var user = new UserDTO();
        var customer = (Customer) authentication.getPrincipal();
        user.setName(customer.getName());

        return ResponseEntity.ok(new LoginResponseDTO(token, "login successful", user));
    }

    @PostMapping("/register")
    public ResponseEntity<CustomerDTO> registerUser(@RequestBody @Valid RegisterRequestDTO registerRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.saveCustomer(registerRequestDTO));
    }
}
