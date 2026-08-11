package com.example.beautyecommerce.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long id;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Size(max = 150)
    @NotBlank
    @Column(nullable = false, length = 150)
    private String street;

    @Size(max = 100)
    @NotBlank
    @Column(nullable = false, length = 100)
    private String city;

    @Size(max = 100)
    @NotBlank
    @Column(nullable = false, length = 100)
    private String state;

    @Size(max = 20)
    @NotBlank
    @Column(name = "postal_code", nullable = false, length = 20)
    private String postalCode;

    @Size(max = 100)
    @NotBlank
    @Column(nullable = false, length = 100)
    private String country;
}
