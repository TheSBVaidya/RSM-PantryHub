package com.pantryhub.product.service;

import com.pantryhub.product.dto.request.ProductReqDto;
import com.pantryhub.product.dto.response.MultipleProductResDto;
import com.pantryhub.product.dto.response.ProductDetailsResDto;
import com.pantryhub.product.dto.response.ProductResDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    List<MultipleProductResDto> getAllActiveProduct();

    List<MultipleProductResDto> getSearchProduct(String name);

    List<ProductResDto> getAllProducts();

    ProductResDto createProduct(ProductReqDto productReqDto);

    ProductResDto uploadProductImages(Long id, MultipartFile[] images);

    ProductResDto updateProduct(Long id, ProductReqDto productReqDto);

    ProductResDto toggleProductStatus(Long id);

    List<MultipleProductResDto> getProductByCategoryId(Long id);
}
