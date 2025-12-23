package com.pantryhub.cart.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResDto {

    private Long id;
    private List<CartItemResDto> cartItems;
    private BigDecimal totalAmount;
}
