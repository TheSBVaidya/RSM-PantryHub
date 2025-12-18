package com.pantryhub.service;

import com.pantryhub.dto.response.ProductResDto;
import com.pantryhub.entity.Product;
import com.pantryhub.entity.Users;
import com.pantryhub.entity.Wishlist;
import com.pantryhub.mapper.ProductMapper;
import com.pantryhub.repository.ProductRepository;
import com.pantryhub.repository.UserRepository;
import com.pantryhub.repository.WishlistRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

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
