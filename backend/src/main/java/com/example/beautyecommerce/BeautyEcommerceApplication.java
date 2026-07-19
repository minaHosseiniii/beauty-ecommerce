package com.example.beautyecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class BeautyEcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeautyEcommerceApplication.class, args);
	}

}
