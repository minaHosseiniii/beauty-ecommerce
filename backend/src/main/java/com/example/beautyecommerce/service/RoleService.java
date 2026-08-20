package com.example.beautyecommerce.service;

import com.example.beautyecommerce.entity.Role;

public interface RoleService {
    Role findByRoleName(String roleName);
}
