package com.pantryhub.controller;

import com.pantryhub.dto.response.ProductResDto;
import com.pantryhub.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductResDto>> getAllActiveProduct() {
        List<ProductResDto> productResDtoList = productService.getAllActiveProduct();
        return ResponseEntity.ok(productResDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResDto> getActiveProductById(@PathVariable Long id) {
        ProductResDto productResDto = productService.getActiveProductById(id);
        return ResponseEntity.ok(productResDto);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResDto>> getSearchProduct(@RequestParam(name = "q", required = false) String keyword) {
        List<ProductResDto> productResDtoList = productService.getSearchProduct(keyword);

//        System.out.println("Size: " + productResDtoList.size());
        if (productResDtoList.size() < 1)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return ResponseEntity.ok(productResDtoList);
    }

}
