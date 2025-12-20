package com.pantryhub.category.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryReqDto {

    @NotBlank(message = "Category name is required.")
    private String name;

    @Size(max = 255, message = "Description cannot exceed 255 characters.")
    private String description;

    // Optional for creating subcategories
    private Long parentId;

    // URLs and Metadata
    private String imageUrl;
//    private String iconName;
    private Integer sortOrder;
    private String metaTitle;
    private String metaDescription;

    // Status flag for Admin control
    private Boolean isActive;
}
