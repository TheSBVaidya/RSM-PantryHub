package com.pantryhub.product.controller;

import com.pantryhub.product.dto.response.MultipleProductResDto;
import com.pantryhub.product.dto.response.ProductDetailsResDto;
import com.pantryhub.product.dto.response.ProductResDto;
import com.pantryhub.product.service.ProductDetailsService;
import com.pantryhub.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductDetailsService productDetailsService;

    @GetMapping
    public ResponseEntity<List<MultipleProductResDto>> getAllActiveProduct() {
        List<MultipleProductResDto> productResDtoList = productService.getAllActiveProduct();
        return ResponseEntity.ok(productResDtoList);
    }

    @GetMapping("/{productId}/{userId}")
    public ResponseEntity<ProductDetailsResDto> getActiveProductById(@PathVariable Long productId, @PathVariable Long userId) {
        ProductDetailsResDto productResDto = productDetailsService.getActiveProductById(productId, userId);
        return ResponseEntity.ok(productResDto);
    }

    @GetMapping("/search")
    public ResponseEntity<List<MultipleProductResDto>> getSearchProduct(@RequestParam(name = "q", required = false) String keyword) {
        List<MultipleProductResDto> productResDtoList = productService.getSearchProduct(keyword);
        return ResponseEntity.ok(productResDtoList);
    }

    @GetMapping("/getByCategory/{id}")
    public ResponseEntity<List<MultipleProductResDto>> getProductByCategoryId(@PathVariable Long id) {
        List<MultipleProductResDto> productResDto = productService.getProductByCategoryId(id);
        return ResponseEntity.ok(productResDto);
    }

}
