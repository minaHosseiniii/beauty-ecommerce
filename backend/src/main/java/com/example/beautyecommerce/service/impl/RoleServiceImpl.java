package com.example.beautyecommerce.service.impl;

import com.example.beautyecommerce.entity.Role;
import com.example.beautyecommerce.repository.RoleRepository;
import com.example.beautyecommerce.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role findByRoleName(String roleName) {
        return roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found : " + roleName));
    }
}
