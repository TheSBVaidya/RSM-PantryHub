package com.pantryhub.wishlist.controller;

import com.pantryhub.product.dto.response.ProductResDto;
import com.pantryhub.wishlist.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("add-to-wishlist/{userId}/{productId}")
    public ResponseEntity<String> addToWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        String message = wishlistService.addToWishList(userId, productId);
        return ResponseEntity.ok(message);
    }

    @GetMapping("get-wishlist/{id}")
    public ResponseEntity<List<ProductResDto>> getWishlist(@PathVariable Long id) {
        List<ProductResDto> productResDtoList = wishlistService.getWishlist(id);
        return ResponseEntity.ok(productResDtoList);
    }

    @DeleteMapping("/remove/{userId}/{productId}")
    public ResponseEntity<String> removeWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        wishlistService.removeWishlist(userId,productId);
        return ResponseEntity.ok("Remove From Wishlist");
    }

    @GetMapping("/check/{userId}/{productId}")
    public ResponseEntity<Boolean> isProductWishlisted(@PathVariable Long userId, @PathVariable Long productId) {
        Boolean exists = wishlistService.isProductWishlisted(userId, productId);
        return ResponseEntity.ok(exists);
    }
}
