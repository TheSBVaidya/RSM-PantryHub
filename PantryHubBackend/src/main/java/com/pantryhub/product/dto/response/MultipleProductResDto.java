package com.pantryhub.product.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class MultipleProductResDto {

    private Long id;
    private String name;
    private String imageUrl;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private Integer stockQuantity;
    private Long categoryId;
    private String categoryName;
    private String dealTag;
}
