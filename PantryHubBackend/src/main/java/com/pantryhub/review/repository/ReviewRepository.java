package com.pantryhub.review.repository;

import com.pantryhub.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByProduct_IdAndIsActiveTrue(Long productId);

    Optional<Review> findByUserIdAndProductIdAndIsActiveTrue(Long userId, Long productId);

    List<Review> findAllByUser_IdAndIsActiveTrue(Long id);

    Long countByProductId(Long productId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double findAverageRatingByProductId(Long productId);
}
