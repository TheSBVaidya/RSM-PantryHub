package com.pantryhub.cart.mapper;

import com.pantryhub.cart.dto.response.CartItemResDto;
import com.pantryhub.cart.dto.response.CartResDto;
import com.pantryhub.cart.entity.Cart;
import com.pantryhub.cart.entity.CartItem;
import com.pantryhub.product.entity.Product;
import com.pantryhub.user.entity.Users;

import java.math.BigDecimal;
import java.util.List;

public class CartMapper {

    public static CartResDto mapToCartResDto(Cart cart) {
        CartResDto dto = new CartResDto();
        dto.setId(cart.getId());
        dto.setTotalAmount(cart.getTotalAmount());

        List<CartItemResDto> items = cart.getCartItems().stream()
                .map(item -> {
                    CartItemResDto cartItemResDto = new CartItemResDto();
                    cartItemResDto.setId(item.getId());
                    cartItemResDto.setProductId(item.getProduct().getId());
                    cartItemResDto.setProductName(item.getProduct().getName());
                    cartItemResDto.setImageUrl(item.getProduct().getImageUrl());
                    cartItemResDto.setPrice(item.getPrice());
                    cartItemResDto.setQuantity(item.getQuantity() );
                    return  cartItemResDto;
                }).toList();

        dto.setCartItems(items);

        return dto;

    }

    public static Cart mapToCart(Product product, Integer quantity, Cart cart) {
        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(null);

        if (cartItem == null) {
            // add new items
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setPrice(product.getPrice());

            cart.getCartItems().add(cartItem);
        } else {
            //update quantity
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        cart.setTotalAmount(recalculateCart(cart));

        return cart;
    }

    public static Cart mapToUpdateQuantity(Cart cart, Integer quantity, CartItem cartItem) {

        if (quantity <= 0) {
            cart.getCartItems().remove(cartItem);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        cart.setTotalAmount(recalculateCart(cart));

        return cart;
    }

    private static BigDecimal recalculateCart(Cart cart) {
        return cart.getCartItems().stream()
                .map(item -> item.getPrice()
                                    .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
