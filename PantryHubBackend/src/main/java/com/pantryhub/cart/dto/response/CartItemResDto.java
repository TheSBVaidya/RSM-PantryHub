package com.pantryhub.cart.dto.response;

import lombok.Data;
import org.aspectj.apache.bcel.generic.LineNumberGen;

import java.math.BigDecimal;

@Data
public class CartItemResDto {

    private Long id;
    private Long productId;
    private String productName;
    private String imageUrl;
    private Integer quantity;
    private BigDecimal price;
}
