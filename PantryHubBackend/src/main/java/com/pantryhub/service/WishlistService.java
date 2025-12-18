package com.pantryhub.service;

import com.pantryhub.dto.response.ProductResDto;

import java.util.List;

public interface WishlistService {

    String addToWishList(Long userId, Long productId);

    List<ProductResDto> getWishlist(Long id);

    void removeWishlist(Long userId, Long productId);

    Boolean isProductWishlisted(Long userId, Long productId);
}
