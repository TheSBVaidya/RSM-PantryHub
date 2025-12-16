package com.pantryhub.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductResDto {

    private Long id;
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private Integer stockQuantity;
    private String unitOfMeasure;
    private String dealTag;
    private String status;
    private Double rating;
    private Integer reviewCount;
    private String imageUrl;
    private List<String> galleryImages;
    private List<String> tags;
    private Long CategoryId;
}
