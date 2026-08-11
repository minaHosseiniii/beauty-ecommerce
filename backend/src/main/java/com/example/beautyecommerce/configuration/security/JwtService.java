package com.example.beautyecommerce.configuration.security;

import com.example.beautyecommerce.entity.Customer;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtProperties jwtProperties;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(
                jwtProperties.secret().getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Authentication authentication) {
        var user = (Customer) authentication.getPrincipal();
        Date now = new Date();
        Date expiration = new Date(now.getTime() + jwtProperties.expiration());

        return Jwts.builder()
                .issuer("beauty-ecommerce")
                .subject(user.getEmail())
                .claim("username", user.getName())
                .claim("roles", Collections.emptyList())
                .issuedAt(now)
                .expiration(expiration)
                .signWith(getSecretKey())
                .compact();

    }
}
