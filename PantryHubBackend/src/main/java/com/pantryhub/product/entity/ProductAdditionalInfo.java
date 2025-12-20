package com.pantryhub.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "product_additional_info")
public class ProductAdditionalInfo {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long Id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;

    @Column(length = 100)
    private String brand;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "country_of_origin", length = 100)
    private String CountryOfOrigin;

    @Column(length = 150)
    private String manufacturer;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Column(name = "shelf_life")
    private Integer shelfLife; //store in months

    @Column(name = "storage_instructions")
    private String storageInstructions;

    @Column(name = "food_type", length = 20)
    private String foodType; //veg or non-veg

    private Boolean organic;

    @Column(name = "is_returnable")
    private Boolean isReturnable;

    @Column(name = "is_refundable")
    private Boolean isRefundable;

}
