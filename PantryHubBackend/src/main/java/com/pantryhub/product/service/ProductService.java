package com.pantryhub.product.service;

import com.pantryhub.product.dto.request.ProductReqDto;
import com.pantryhub.product.dto.response.ProductResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    List<ProductResDto> getAllActiveProduct();

    ProductResDto getActiveProductById(Long id);

    List<ProductResDto> getSearchProduct(String name);


    List<ProductResDto> getAllProducts();

    ProductResDto createProduct(ProductReqDto productReqDto);

    ProductResDto uploadProductImages(Long id, MultipartFile[] images);

    ProductResDto updateProduct(Long id, ProductReqDto productReqDto);

    ProductResDto toggleProductStatus(Long id);

    List<ProductResDto> getProductByCategoryId(Long id);
}
