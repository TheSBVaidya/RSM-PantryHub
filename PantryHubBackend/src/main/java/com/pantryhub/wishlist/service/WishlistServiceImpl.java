package com.pantryhub.wishlist.service;

import com.pantryhub.product.dto.response.ProductResDto;
import com.pantryhub.product.entity.Product;
import com.pantryhub.user.entity.Users;
import com.pantryhub.wishlist.entity.Wishlist;
import com.pantryhub.product.mapper.ProductMapper;
import com.pantryhub.product.repository.ProductRepository;
import com.pantryhub.user.repository.UserRepository;
import com.pantryhub.wishlist.repository.WishlistRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public String addToWishList(Long userId, Long productId) {

        if (wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent())
            throw new IllegalArgumentException("Product Already in wishlist");

        Users users = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not Fount"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product Not Found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(users);
        wishlist.setProduct(product);

        wishlistRepository.save(wishlist);

        return "Wishlist Added";
    }

    @Override
    public List<ProductResDto> getWishlist(Long id) {

        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(id)
                .orElseThrow(() -> new EntityNotFoundException("No Wishlist yet"));

        return wishlists.stream()
                .map(p -> ProductMapper.mapToProductResDto(p.getProduct()))
                .collect(Collectors.toList());

    }

    @Override
    public void removeWishlist(Long userId, Long productId) {
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Override
    public Boolean isProductWishlisted(Long userId, Long productId) {
        return wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent();
    }
}
