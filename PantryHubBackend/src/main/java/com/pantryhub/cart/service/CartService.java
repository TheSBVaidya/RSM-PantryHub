package com.pantryhub.cart.service;

import com.pantryhub.cart.dto.request.CartReqDto;
import com.pantryhub.cart.dto.response.CartResDto;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CartService {

    CartResDto getCart(Authentication authentication);

    CartResDto addToCart(CartReqDto cartReqDto, Authentication authentication);

    CartResDto updateQuantity(Long cartItemId, Integer quantity, Authentication authentication);

    void removeCartItem(Long cartItemId, Authentication authentication);

    void emptyCart(Authentication authentication);
}
