package com.pantryhub.category.service;

import com.pantryhub.category.dto.request.CategoryReqDto;
import com.pantryhub.category.dto.response.CategoryResDto;

import java.util.List;

public interface CategoryService {
    //public
    List<CategoryResDto> getAllActiveCategories();

    CategoryResDto getActiveCategoriesById(Long id);

    CategoryResDto getCategoryBySlug(String slug);

    //admin
    CategoryResDto createCategory(CategoryReqDto categoryReqDto);

    CategoryResDto toggleCategoryStatus(Long id);

    CategoryResDto updateCategory(Long id, CategoryReqDto categoryReqDto);

    List<CategoryResDto> getAllCategories();

    CategoryResDto updateCategorySortOrder(Long id, Integer sortOrder);
}
