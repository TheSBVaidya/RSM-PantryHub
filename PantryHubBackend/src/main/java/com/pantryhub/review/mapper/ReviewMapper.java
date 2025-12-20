package com.pantryhub.review.mapper;

import com.pantryhub.product.entity.Product;
import com.pantryhub.review.dto.request.ReviewReqDto;
import com.pantryhub.review.dto.response.ReviewResDto;
import com.pantryhub.review.entity.Review;
import com.pantryhub.user.entity.Users;

import java.time.LocalDateTime;

public class ReviewMapper {

    public static ReviewResDto mapToReviewResDto(Review review) {
        ReviewResDto dto = new ReviewResDto();
        dto.setId(review.getId());
        dto.setUserName(review.getUser().getFirstName() + " " + review.getUser().getLastName());
        dto.setUserAvatar(review.getUser().getImageUrl());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedDate(review.getCreatedAt());

        return dto;
    }

    public static Review mapToReview(ReviewReqDto reviewReqDto, Users users, Product product) {
        Review review = new Review();

        review.setUser(users);
        review.setProduct(product);
        review.setRating(reviewReqDto.getRating());
        review.setComment(reviewReqDto.getComment());
        review.setIsActive(true);
        review.setCreatedAt(LocalDateTime.now());

        return review;
    }

    public static void updateReviewFromReqDto(ReviewReqDto dto, Review review) {

        if (dto == null || review == null)
            return;

        if (dto.getRating() != null)
            review.setRating(dto.getRating());

        if (dto.getComment() != null)
            review.setComment(dto.getComment());
    }
}
