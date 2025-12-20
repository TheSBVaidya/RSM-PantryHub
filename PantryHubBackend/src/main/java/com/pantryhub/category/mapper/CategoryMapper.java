package com.pantryhub.category.mapper;

import com.pantryhub.category.dto.request.CategoryReqDto;
import com.pantryhub.category.dto.response.CategoryResDto;
import com.pantryhub.category.entity.Category;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.pantryhub.common.util.SlugUtil.toSlug;

public class CategoryMapper {

    public static CategoryResDto mapToCategoryResDto(Category category) {
        return mapToCategoryResDto(category, Collections.emptyList());
    }

    public static CategoryResDto mapToCategoryResDto(Category entity, List<CategoryResDto> subCategories) {
        if (entity == null) {
            return null;
        }

        CategoryResDto dto = new CategoryResDto();

        // 1. Basic Fields (Direct Mapping)
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSlug(entity.getSlug());
        dto.setDescription(entity.getDescription());
        dto.setParentId(entity.getParentId());
        dto.setImageUrl(entity.getImageUrl());
        dto.setSortOrder(entity.getSortOrder());
        dto.setIsActive(entity.getIsActive());
        dto.setMetaTitle(entity.getMetaTitle());
        dto.setMetaDescription(entity.getMetaDescription());
        dto.setCreatedAt(entity.getCreatedAt());

        dto.setSubCategories(subCategories != null ? subCategories : Collections.emptyList());

        // dto.setIconName(entity.getIconName());

        return dto;
    }

    public static List<CategoryResDto> toDtoList(List<Category> entities) {
        if (entities == null) {
            return Collections.emptyList();
        }
        return entities.stream()
                .map(CategoryMapper::mapToCategoryResDto) // Pass null for subCategories in flat lists
                .collect(Collectors.toList());
    }

    public static Category mapToCategory(CategoryReqDto dto) {
        if (dto == null) {
            return null;
        }

        Category category = new Category();

        // Core fields
        category.setName(dto.getName());
        category.setSlug(toSlug(dto.getName())); // auto-generate slug
        category.setDescription(dto.getDescription());
        category.setParentId(dto.getParentId());

        // Media
        category.setImageUrl(dto.getImageUrl());

        // SEO
        category.setMetaTitle(dto.getMetaTitle());
        category.setMetaDescription(dto.getMetaDescription());

        // Extra configs
        category.setSortOrder(dto.getSortOrder());
        category.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());

        return category;
    }

    // Utility method for slug creation
//    private static String generateSlug(String name) {
//        if (name == null) return null;
//
//        return name.toLowerCase()
//                .trim()
//                .replaceAll("[^a-z0-9\\s-]", "")
//                .replaceAll("\\s+", "-");
//    }

}
