package com.example.beautyecommerce.mapper;

import com.example.beautyecommerce.dto.ContactDTO;
import com.example.beautyecommerce.entity.Contact;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContactMapper {
    ContactDTO toContactDTO(Contact contact);
    Contact toContact(ContactDTO contactDTO);
    List<ContactDTO> toContactDTOList(List<Contact> contacts);

}
