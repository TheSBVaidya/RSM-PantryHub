package com.pantryhub.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CategoryResDto {

    private Long id;
    private String name;
    private String slug;
    private Boolean isActive;
    private String description;
    private Long parentId;
    private String imageUrl;
    private Integer sortOrder;
    private String metaTitle;
    private String metaDescription;
    private List<CategoryResDto> subCategories;
    private LocalDateTime createdAt;
}
