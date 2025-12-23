package com.pantryhub.cart.controller;

import com.google.rpc.context.AttributeContext;
import com.pantryhub.cart.dto.request.CartReqDto;
import com.pantryhub.cart.dto.response.CartResDto;
import com.pantryhub.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<CartResDto> getCart(Authentication authentication) {
        CartResDto cartResDtoList = cartService.getCart(authentication);
        return ResponseEntity.ok(cartResDtoList);
    }

    @PostMapping("/add")
    public ResponseEntity<CartResDto> addToCart(@RequestBody CartReqDto cartReqDto, Authentication authentication) {
        CartResDto cartResDto = cartService.addToCart(cartReqDto, authentication);
        return ResponseEntity.ok(cartResDto);
    }

    @PatchMapping("/update/{cartItemId}")
    public ResponseEntity<CartResDto> updateQuantity(@PathVariable Long cartItemId, @RequestParam Integer quantity, Authentication authentication) {
        CartResDto cartResDto = cartService.updateQuantity(cartItemId, quantity, authentication);
        return ResponseEntity.ok(cartResDto);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<String> removeCartItem(@PathVariable Long cartItemId, Authentication authentication) {
        cartService.removeCartItem(cartItemId, authentication);
        return ResponseEntity.ok("Product Removed!");
    }

    @DeleteMapping("/emptyCart")
    public ResponseEntity<String> emptyCart(Authentication authentication) {
        cartService.emptyCart(authentication);
        return ResponseEntity.ok("Cart is Empty");
    }
}
