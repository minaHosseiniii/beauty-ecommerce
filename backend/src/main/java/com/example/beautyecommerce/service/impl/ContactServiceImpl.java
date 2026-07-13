package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.dto.ContactDTO;
import com.example.beautyecommerce.mapper.ContactMapper;
import com.example.beautyecommerce.repository.ContactRepository;
import com.example.beautyecommerce.service.ContactService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class ContactServiceImpl implements ContactService {
    private final ContactRepository contactRepository;
    private final ContactMapper contactMapper;

    @Override
    public Boolean addContact(ContactDTO contact) {
        try {
            contactRepository.save(contactMapper.toContact(contact));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
