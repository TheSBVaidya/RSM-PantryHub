package com.pantryhub.cart.service;

import com.pantryhub.cart.dto.request.CartReqDto;
import com.pantryhub.cart.dto.response.CartResDto;
import com.pantryhub.cart.entity.Cart;
import com.pantryhub.cart.entity.CartItem;
import com.pantryhub.cart.repository.CartItemRepository;
import com.pantryhub.cart.repository.CartRepository;
import com.pantryhub.product.entity.Product;
import com.pantryhub.product.repository.ProductRepository;
import com.pantryhub.user.entity.Users;
import com.pantryhub.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static com.pantryhub.cart.mapper.CartMapper.*;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public CartResDto getCart(Authentication authentication) {

        String email = authentication.getName();

        Users users = findUserByEmail(email);

        Cart cart = findCartByUserId(users);

        return mapToCartResDto(cart);
    }

    @Override
    public CartResDto addToCart(CartReqDto cartReqDto, Authentication authentication) {

        Users users = findUserByEmail(authentication.getName());
        Cart cart = findCartByUserId(users);
        Product product = findProductById(cartReqDto.getProductId());

        Cart addedCart = cartRepository.save(mapToCart( product, cartReqDto.getQuantity(), cart));

        return mapToCartResDto(addedCart);
    }

    @Override
    public CartResDto updateQuantity(Long cartItemId, Integer quantity, Authentication authentication) {

        Users users = findUserByEmail(authentication.getName());
        Cart cart = findCartByUserId(users);

        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Cart Item Not Found"));

        if (!cartItem.getCart().getId().equals(cart.getId()))
            throw new IllegalArgumentException("Unauthorized cart item access");

        Cart updatedCart = cartRepository.save(mapToUpdateQuantity(cart, quantity, cartItem));

        return mapToCartResDto(updatedCart);
    }

    @Override
    public void removeCartItem(Long cartItemId, Authentication authentication) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void emptyCart(Authentication authentication) {
        Users users = findUserByEmail(authentication.getName());
        cartRepository.deleteByUsers_Id(users.getId());
    }

    private Users findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));
    }

    private Cart findCartByUserId(Users users) {
        return cartRepository.findByUsers_Id(users.getId())
                .orElseGet(() -> createEmptyCart(users));
    }

    private Product findProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product Not Found"));
    }

    private Cart createEmptyCart(Users users) {
        Cart cart = new Cart();
        cart.setUsers(users);
        cart.setTotalAmount(BigDecimal.valueOf(0.0));
        return cartRepository.save(cart);
    }
}
