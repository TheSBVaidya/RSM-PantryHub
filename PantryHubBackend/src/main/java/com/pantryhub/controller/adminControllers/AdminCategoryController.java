package com.pantryhub.controller.adminControllers;

import com.pantryhub.dto.request.CategoryReqDto;
import com.pantryhub.dto.response.CategoryResDto;
import com.pantryhub.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/category")
public class AdminCategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResDto> createCategory(@RequestBody CategoryReqDto categoryReqDto) {
        CategoryResDto categoryResDto = categoryService.createCategory(categoryReqDto);
        return ResponseEntity.ok(categoryResDto);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<CategoryResDto> toggleCategoryStatus(@PathVariable Long id) {
//        System.out.println("id: " + id);
        CategoryResDto categoryResDto = categoryService.toggleCategoryStatus(id);
        return ResponseEntity.ok(categoryResDto);
    }

    @PutMapping("{id}")
    public ResponseEntity<CategoryResDto> updateCategory(@PathVariable Long id, @RequestBody CategoryReqDto categoryReqDto) {
        CategoryResDto categoryResDto = categoryService.updateCategory(id, categoryReqDto);
        return ResponseEntity.ok(categoryResDto);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResDto>> getAllCategories() {
        List<CategoryResDto> categoryResDto = categoryService.getAllCategories();
        return ResponseEntity.ok(categoryResDto);
    }

    @PatchMapping("/{id}/sort-order/{sortOrder}")
    public ResponseEntity<CategoryResDto> updateCategorySortOrder(@PathVariable Long id, @PathVariable Integer sortOrder) {
//        System.out.println("id: " + id);
        CategoryResDto categoryResDto = categoryService.updateCategorySortOrder(id, sortOrder);
        return ResponseEntity.ok(categoryResDto);
    }
}
