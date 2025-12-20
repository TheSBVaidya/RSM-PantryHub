package com.pantryhub.review.repository;

import com.pantryhub.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByProduct_IdAndIsActiveTrue(Long productId);

    Optional<Review> findByUserIdAndProductIdAndIsActiveTrue(Long userId, Long productId);

    List<Review> findAllByUser_IdAndIsActiveTrue(Long id);
}
