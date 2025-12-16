package com.pantryhub.controller.adminControllers;

import com.pantryhub.dto.request.ProductReqDto;
import com.pantryhub.dto.response.ProductResDto;
import com.pantryhub.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin/product")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductResDto>> getAllProducts() {
        List<ProductResDto> productResDtoList = productService.getAllProducts();
        return ResponseEntity.ok(productResDtoList);
    }


    @PostMapping("/create")
    public ResponseEntity<ProductResDto> createProduct(@RequestBody ProductReqDto productReqDto) {
        ProductResDto productResDto = productService.createProduct(productReqDto);
        return new ResponseEntity<>(productResDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/upload-image")
    public ResponseEntity<ProductResDto> uploadProductImages(@PathVariable Long id, @RequestParam MultipartFile[] images) {
        ProductResDto productResDto = productService.uploadProductImages(id, images);
        return ResponseEntity.ok(productResDto);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<ProductResDto> updateProduct(@PathVariable Long id, @RequestBody ProductReqDto productReqDto) {
        ProductResDto productResDto = productService.updateProduct(id, productReqDto);
        return ResponseEntity.ok(productResDto);
    }
}
