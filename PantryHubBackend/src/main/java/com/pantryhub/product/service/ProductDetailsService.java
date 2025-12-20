package com.pantryhub.product.service;

import com.pantryhub.product.dto.response.ProductDetailsResDto;
import org.springframework.security.core.Authentication;

public interface ProductDetailsService {
    ProductDetailsResDto getActiveProductById(Long id, Authentication authentication);
}
