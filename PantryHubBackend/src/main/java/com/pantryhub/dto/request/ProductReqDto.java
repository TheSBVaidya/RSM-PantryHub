package com.pantryhub.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductReqDto {

    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal costPrice;
    private Integer stockQuantity;
    private String unitOfMeasure;
    private String dealTag;
    private String status;
    private List<String> tags;
    private Long categoryId;
}
