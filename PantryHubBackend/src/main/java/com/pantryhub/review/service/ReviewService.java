package com.pantryhub.review.service;

import com.pantryhub.review.dto.request.ReviewReqDto;
import com.pantryhub.review.dto.response.ReviewResDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ReviewService {
    List<ReviewResDto> getAllProductReviews(Long productId);

    ReviewResDto addReview(ReviewReqDto reviewReqDto, Authentication authentication);

    void deleteReview(Long review_id);

    List<ReviewResDto> getAllUserReviews(Long id);

    ReviewResDto updateReview(Long review_id, ReviewReqDto reviewReqDto);
}
