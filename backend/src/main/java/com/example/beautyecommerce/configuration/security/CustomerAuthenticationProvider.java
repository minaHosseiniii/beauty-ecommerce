package com.example.beautyecommerce.configuration.security;

import com.example.beautyecommerce.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class CustomerAuthenticationProvider
        implements AuthenticationProvider {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(
            Authentication authentication)
            throws AuthenticationException {

        var email = authentication.getName();

        var password =
                authentication.getCredentials().toString();

        var customer =
                customerRepository.findCustomerForAuthenticationByEmail(email)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "Customer not found: " + email
                                )
                        );

        if (!passwordEncoder.matches(
                password,
                customer.getPasswordHash())) {

            throw new BadCredentialsException(
                    "Invalid password"
            );
        }

        Set<GrantedAuthority> authorities =
                customer.getRoles()
                        .stream()
                        .flatMap(role -> Stream.concat(

                                Stream.of(
                                        new SimpleGrantedAuthority(
                                                role.getRoleName()
                                        )
                                ),

                                role.getPermissions()
                                        .stream()
                                        .map(permission ->
                                                new SimpleGrantedAuthority(
                                                        permission.getPermissionName()
                                                )
                                        )
                        ))
                        .collect(Collectors.toSet());

        return new UsernamePasswordAuthenticationToken(
                customer,
                null,
                authorities
        );
    }

    @Override
    public boolean supports(
            Class<?> authentication) {

        return UsernamePasswordAuthenticationToken.class
                .isAssignableFrom(authentication);
    }
}
