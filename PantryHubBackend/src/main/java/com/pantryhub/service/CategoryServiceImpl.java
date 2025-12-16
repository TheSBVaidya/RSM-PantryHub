package com.pantryhub.service;

import com.pantryhub.dto.request.CategoryReqDto;
import com.pantryhub.dto.response.CategoryResDto;
import com.pantryhub.entity.Category;
import com.pantryhub.mapper.CategoryMapper;
import com.pantryhub.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.pantryhub.mapper.CategoryMapper.mapToCategory;
import static com.pantryhub.mapper.CategoryMapper.mapToCategoryResDto;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryResDto> getAllActiveCategories() {
        List<Category> list = categoryRepository.findAllByIsActiveTrue();
        Map<Long, List<Category>> categoriesByParentId = list.stream()
                .filter(category -> category.getParentId() != null)
                .collect(Collectors.groupingBy(Category::getParentId));

        return buildHierarchy(null, list, categoriesByParentId);
    }

    @Override
    public CategoryResDto getActiveCategoriesById(Long id) {
        List<Category> listCategory = categoryRepository.findAllByIsActiveTrue();

        Category category = listCategory.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Category not found of given id: " + id));

        Map<Long, List<Category>> categoriesByParentId = listCategory.stream()
                .filter(c -> c.getParentId() != null)
                .collect(Collectors.groupingBy(Category::getParentId));

        List<CategoryResDto> subCategories = buildHierarchy(category.getId(), listCategory, categoriesByParentId);
        return mapToCategoryResDto(category, subCategories);
    }

    @Override
    public CategoryResDto getCategoryBySlug(String slug) {

        Category category = categoryRepository.findBySlugAndIsActiveTrue(slug)
                .orElseThrow(() -> new EntityNotFoundException("Not Found"));

        return mapToCategoryResDto(category);
    }

    @Override
    public CategoryResDto createCategory(CategoryReqDto categoryReqDto) {
        Category category = categoryRepository.save(mapToCategory(categoryReqDto));
        return mapToCategoryResDto(category);
    }

    @Override
    public CategoryResDto toggleCategoryStatus(Long id) {

        Category category = findCategoryById(id);

        category.setIsActive(!category.getIsActive()); //if true set false and wise-versa

        Category afterToggleCategory = categoryRepository.save(category);

        return mapToCategoryResDto(afterToggleCategory);
    }

    @Override
    public CategoryResDto updateCategory(Long id, CategoryReqDto categoryReqDto) {
        Category category = findCategoryById(id);

        String name = categoryReqDto.getName();
        String description = categoryReqDto.getDescription();
        Long parentId = categoryReqDto.getParentId();
        String imageUrl = categoryReqDto.getImageUrl();
//        String iconName = categoryReqDto.getIconName();
        Integer sortOrder = categoryReqDto.getSortOrder();
        String metaTitle = categoryReqDto.getMetaTitle();
        String metaDescription = categoryReqDto.getMetaDescription();
        Boolean isActive = categoryReqDto.getIsActive();

        if (name != null) {
            category.setName(name);
        }
        if (description != null) {
            category.setDescription(description);
        }
        if (parentId != null) {
            category.setParentId(parentId);
        }
        if (imageUrl != null) {
            category.setImageUrl(imageUrl);
        }
//        if (iconName != null) {
//            category.setIconName(iconName);
//        }
        if (sortOrder != null) {
            category.setSortOrder(sortOrder);
        }
        if (metaTitle != null) {
            category.setMetaTitle(metaTitle);
        }
        if (metaDescription != null) {
            category.setMetaDescription(metaDescription);
        }
        if (isActive != null) {
            category.setIsActive(isActive);
        }

        Category updatedCategory = categoryRepository.save(category);

        return mapToCategoryResDto(updatedCategory);

    }

    @Override
    public List<CategoryResDto> getAllCategories() {
        List<Category> list = categoryRepository.findAll();
        Map<Long, List<Category>> categoriesByParentId = list.stream()
                .filter(category -> category.getParentId() != null)
                .collect(Collectors.groupingBy(Category::getParentId));

        return buildHierarchy(null, list, categoriesByParentId);
    }

    @Override
    public CategoryResDto updateCategorySortOrder(Long id, Integer sortOrder) {
        Category category = findCategoryById(id);

        category.setSortOrder(sortOrder);

        Category updateCategorySortOrder = categoryRepository.save(category);

        return mapToCategoryResDto(updateCategorySortOrder);

    }

    private List<CategoryResDto> buildHierarchy(Long parentId, List<Category> list, Map<Long, List<Category>> categoriesByParentId) {
        List<Category> directChildren = list.stream()
                .filter(category -> (parentId == null && category.getParentId() == null) ||
                                    (parentId != null && parentId.equals(category.getParentId()))    )
                .sorted(Comparator.comparing(Category::getSortOrder))
                .collect(Collectors.toList());

        if (directChildren.isEmpty()) {
            return Collections.emptyList();
        }

        return directChildren.stream()
                .map(category -> {
                    List<CategoryResDto> subCategories = buildHierarchy(category.getId(), list, categoriesByParentId);

                    return mapToCategoryResDto(category, subCategories);
                })
                .collect(Collectors.toList());
    }

    private Category findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found of given id: " + id));
    }
}
