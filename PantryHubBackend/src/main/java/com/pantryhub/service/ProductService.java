package com.pantryhub.service;

import com.pantryhub.dto.request.ProductReqDto;
import com.pantryhub.dto.response.ProductResDto;
import com.pantryhub.entity.Product;
import com.pantryhub.entity.ProductStatus;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
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
