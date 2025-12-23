package com.pantryhub.cart.dto.request;

import lombok.Data;

@Data
public class CartReqDto {

    private Long productId;
    private Integer quantity;
}
