package com.example.beautyecommerce.controller;

import com.example.beautyecommerce.dto.ContactDTO;
import com.example.beautyecommerce.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService service;

    @PostMapping
    public String saveContact(@RequestBody ContactDTO dto) {
        boolean saved = service.addContact(dto);
        if (saved) {
            return "Request processed successfully";
        }
        return "Error occurred";
    }
}
