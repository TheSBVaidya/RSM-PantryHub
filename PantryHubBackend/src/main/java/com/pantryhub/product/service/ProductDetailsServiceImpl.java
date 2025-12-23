package com.pantryhub.product.service;

import com.pantryhub.product.dto.response.AdditionalInfoResDto;
import com.pantryhub.product.dto.response.ProductDetailsResDto;
import com.pantryhub.product.dto.response.ProductResDto;
import com.pantryhub.product.entity.Product;
import com.pantryhub.product.entity.ProductAdditionalInfo;
import com.pantryhub.product.repository.ProductAdditionalInfoRepository;
import com.pantryhub.product.repository.ProductRepository;
import com.pantryhub.review.dto.response.ReviewResDto;
import com.pantryhub.review.entity.Review;
import com.pantryhub.review.mapper.ReviewMapper;
import com.pantryhub.review.repository.ReviewRepository;
import com.pantryhub.user.entity.Users;
import com.pantryhub.user.repository.UserRepository;
import com.pantryhub.wishlist.repository.WishlistRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.pantryhub.product.mapper.ProductMapper.mapToAdditionalInfoResDto;
import static com.pantryhub.product.mapper.ProductMapper.mapToProductResDto;

@Service
@RequiredArgsConstructor
public class ProductDetailsServiceImpl implements ProductDetailsService{

    private final ProductRepository productRepository;
    private final ProductAdditionalInfoRepository productAdditionalInfoRepository;
    private final WishlistRepository wishlistRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public ProductDetailsResDto getActiveProductById(Long productId, Long userId) {

        Product product = findProductById(productId);
        ProductAdditionalInfo productAdditionalInfo = findAdditionalInfoById(productId);
        List<Review> reviews = findAllProductReviews(productId);
        Boolean isWishlisted = isWishlisted(userId, productId);
        Long reviewCount = reviewCount(productId);
        Double avgRating = avgRating(productId);

        ProductResDto productResDto = mapToProductResDto(product);
        AdditionalInfoResDto additionalInfoResDto = mapToAdditionalInfoResDto(productAdditionalInfo);
        List<ReviewResDto> reviewResDtos = reviews.stream()
                .map(ReviewMapper::mapToReviewResDto)
                .toList();

        ProductDetailsResDto productDetailsResDto = new ProductDetailsResDto();
        productDetailsResDto.setProduct(productResDto);
        productDetailsResDto.setIsWishlisted(isWishlisted);
        productDetailsResDto.setAvgRating(avgRating);
        productDetailsResDto.setReviewCount(reviewCount);
        productDetailsResDto.setAdditionalInfo(additionalInfoResDto);
        productDetailsResDto.setReviews(reviewResDtos);

        return productDetailsResDto;
    }

    private Product findProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Not Found"));
    }

    private ProductAdditionalInfo findAdditionalInfoById(Long id) {
        return productAdditionalInfoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Additional Info Not Available"));
    }

    private List<Review> findAllProductReviews(Long id) {
        return reviewRepository.findAllByProduct_IdAndIsActiveTrue(id);
    }

    private Long reviewCount(Long productId) {
        return reviewRepository.countByProductId(productId);
    }

    private Double avgRating(Long productId) {
        return reviewRepository.findAverageRatingByProductId(productId);
    }

    private Boolean isWishlisted(Long userId, Long productId) {
        return wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent();
    }
}
