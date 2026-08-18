package com.example.beautyecommerce.configuration.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.password.HaveIBeenPwnedRestApiPasswordChecker;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final CorsConfigurationSource corsConfigurationSource;
    private final JwtTokenValidationFilter jwtTokenValidationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(request -> {
            publicPaths().forEach(path -> request.requestMatchers(path).permitAll());

            request.requestMatchers("/api/v1/admin/**")
                    .hasRole("ADMIN");

            request.requestMatchers("/api/v1/profile/**")
                    .hasAnyRole("USER", "ADMIN");

            request.requestMatchers("/api/v1/address/**")
                    .hasAnyRole("USER", "ADMIN");
        });

        http.addFilterBefore(jwtTokenValidationFilter, UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults());
        http.formLogin(Customizer.withDefaults());
        http.cors(cors -> cors.configurationSource(corsConfigurationSource));
        http.csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(CustomerAuthenticationProvider authenticationProvider) throws Exception {
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public CompromisedPasswordChecker compromisedPasswordChecker() {
        return new HaveIBeenPwnedRestApiPasswordChecker();
    }


    private List<String> publicPaths() {
        return List.of("/api/v1/products/**", "/api/v1/contacts/**", "/api/v1/auth/**");
    }

}
