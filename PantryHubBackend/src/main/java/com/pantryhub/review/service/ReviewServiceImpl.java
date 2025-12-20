package com.pantryhub.review.service;

import com.pantryhub.product.entity.Product;
import com.pantryhub.product.repository.ProductRepository;
import com.pantryhub.review.dto.request.ReviewReqDto;
import com.pantryhub.review.dto.response.ReviewResDto;
import com.pantryhub.review.entity.Review;
import com.pantryhub.review.mapper.ReviewMapper;
import com.pantryhub.review.repository.ReviewRepository;
import com.pantryhub.user.entity.Users;
import com.pantryhub.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.pantryhub.review.mapper.ReviewMapper.*;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public List<ReviewResDto> getAllProductReviews(Long productId) {
        List<Review> reviews = reviewRepository.findAllByProduct_IdAndIsActiveTrue(productId);

        if (reviews.isEmpty())
            throw new EntityNotFoundException("Be the first one to give review");

        return reviews.stream()
                .map(ReviewMapper::mapToReviewResDto)
                .toList();
    }

    @Override
    public ReviewResDto addReview(ReviewReqDto reviewReqDto, Authentication authentication) {
        System.out.println("Service: " + reviewReqDto.toString());


        String email = authentication.getName();
        Users users = findUserByEmail(email);

        if (reviewRepository.findByUserIdAndProductIdAndIsActiveTrue(users.getId(), reviewReqDto.getProductId()).isPresent())
            throw new IllegalArgumentException("Review Given Already");

        Product product = findProductById(reviewReqDto.getProductId());

        System.out.println("Service Product: " + product.toString());

        Review review = reviewRepository.save(mapToReview(reviewReqDto, users,  product));

        System.out.println("Service Review: " + review);

        return mapToReviewResDto(review);
    }

    @Override
    public void deleteReview(Long review_id) {

        Review review = reviewRepository.findById(review_id)
                .orElseThrow(() -> new EntityNotFoundException("Review Not found !"));

        if (review.getIsActive()) {
            review.setIsActive(false);
            reviewRepository.save(review);
        }

    }

    @Override
    public List<ReviewResDto> getAllUserReviews(Long id) {
        List<Review> list = reviewRepository.findAllByUser_IdAndIsActiveTrue(id);

        if (list.isEmpty())
            throw new EntityNotFoundException("Reviews Not given yet!");

        return list.stream()
                .map(ReviewMapper::mapToReviewResDto)
                .toList();
    }

    @Override
    public ReviewResDto updateReview(Long review_id, ReviewReqDto reviewReqDto) {

        Review review = reviewRepository.findById(review_id)
                .orElseThrow(() -> new EntityNotFoundException("Review Not found !"));


        updateReviewFromReqDto(reviewReqDto, review);

        Review updatedReview = reviewRepository.save(review);

        return mapToReviewResDto(updatedReview);
    }


    private Product findProductById(Long id) {
        return productRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Not Found"));
    }

    private Users findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }
}
