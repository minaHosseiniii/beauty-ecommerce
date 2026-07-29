package com.example.beautyecommerce;

import com.example.beautyecommerce.configuration.security.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EnableConfigurationProperties(JwtProperties.class)
public class BeautyEcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeautyEcommerceApplication.class, args);
	}

}
