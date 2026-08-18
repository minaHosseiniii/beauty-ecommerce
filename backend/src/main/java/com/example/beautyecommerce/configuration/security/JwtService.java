package com.example.beautyecommerce.configuration.security;

import com.example.beautyecommerce.entity.Customer;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;


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
        Set<String> authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        return Jwts.builder()
                .issuer("beauty-ecommerce")
                .subject(user.getEmail())
                .claim("username", user.getName())
                .claim("roles", authorities)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(getSecretKey())
                .compact();

    }
}
