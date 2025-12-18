package com.pantryhub.controller;


import com.pantryhub.dto.response.CategoryResDto;
import com.pantryhub.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResDto>> getAllActiveCategories() {
        List<CategoryResDto> list = categoryService.getAllActiveCategories();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResDto> getActiveCategoriesById(@PathVariable Long id) {
        CategoryResDto categoryResDto = categoryService.getActiveCategoriesById(id);
        return ResponseEntity.ok(categoryResDto);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<CategoryResDto> getCategoryBySlug(@PathVariable String slug) {
        CategoryResDto categoryResDto = categoryService.getCategoryBySlug(slug);
        return ResponseEntity.ok(categoryResDto);
    }


}
