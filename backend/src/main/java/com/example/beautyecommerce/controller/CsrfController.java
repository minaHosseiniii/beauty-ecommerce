package com.example.beautyecommerce.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/csrf")
public class CsrfController {
    @GetMapping
    public CsrfToken generateCsrfToken(CsrfToken csrfToken) {
        return csrfToken;
    }
}
