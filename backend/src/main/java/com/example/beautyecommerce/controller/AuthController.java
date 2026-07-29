package com.example.beautyecommerce.controller;

import com.example.beautyecommerce.configuration.security.JwtService;
import com.example.beautyecommerce.dto.LoginRequestDTO;
import com.example.beautyecommerce.dto.LoginResponseDTO;
import com.example.beautyecommerce.dto.RegisterRequestDTO;
import com.example.beautyecommerce.dto.UserDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final InMemoryUserDetailsManager userDetailsManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequestDTO.username(),
                loginRequestDTO.password()
        ));


        String token = jwtService.generateToken(authentication);

        UserDTO user = new UserDTO();
        System.out.println(authentication.getPrincipal());
        System.out.println(authentication.getPrincipal().getClass());
        User loggedInUser = (User) authentication.getPrincipal();
        user.setName(loggedInUser.getUsername());

        return ResponseEntity.ok(new LoginResponseDTO(token, "login successful", user));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody @Valid RegisterRequestDTO registerRequestDTO) {
        var newUser = new User(registerRequestDTO.getEmail(), passwordEncoder.encode(registerRequestDTO.getPassword()), List.of(new SimpleGrantedAuthority("ROLE_USER")));
        userDetailsManager.createUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("registered");
    }
}
