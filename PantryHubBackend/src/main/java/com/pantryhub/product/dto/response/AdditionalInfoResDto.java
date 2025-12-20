package com.pantryhub.product.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class AdditionalInfoResDto {

    private String brand;
    private String description;
    private String countryOfOrigin;
    private String manufacturer;
    private LocalDateTime expiryDate;
    private Integer shelfLife;
    private String storageInstructions;
    private String foodType; // Veg / Non-Veg
    private Boolean organic;
    private Boolean isReturnable;
    private Boolean isRefundable;
}
