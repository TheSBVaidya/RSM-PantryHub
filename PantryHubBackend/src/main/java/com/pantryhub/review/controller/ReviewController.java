package com.pantryhub.review.controller;

import com.pantryhub.review.dto.request.ReviewReqDto;
import com.pantryhub.review.dto.response.ReviewResDto;
import com.pantryhub.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/product/{product_id}")
    public ResponseEntity<List<ReviewResDto>> getAllProductReviews(@PathVariable Long product_id) {
        List<ReviewResDto> reviews = reviewService.getAllProductReviews(product_id);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/addReview")
    public ResponseEntity<ReviewResDto> addReview(@RequestBody ReviewReqDto reviewReqDto, Authentication authentication) {
        ReviewResDto reviewResDto = reviewService.addReview(reviewReqDto, authentication);
        return ResponseEntity.ok(reviewResDto);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ReviewResDto>> getAllUserReviews(@PathVariable Long id) {
        List<ReviewResDto> reviewResDto = reviewService.getAllUserReviews(id);
        return ResponseEntity.ok(reviewResDto);
    }

    @PatchMapping("/delete/{review_id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long review_id) {
        reviewService.deleteReview(review_id);
        return ResponseEntity.ok("Review Deleted !");
    }

    @PatchMapping("/updateReview/{review_id}")
    public ResponseEntity<ReviewResDto> updateReview(@PathVariable Long review_id, @RequestBody ReviewReqDto reviewReqDto) {
        System.out.println("Controller: " + reviewReqDto.toString());
        ReviewResDto reviewResDto = reviewService.updateReview(review_id, reviewReqDto);
        return ResponseEntity.ok(reviewResDto);
    }
}
