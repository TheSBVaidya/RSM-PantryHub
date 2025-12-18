package com.pantryhub.repository;

import com.pantryhub.entity.Wishlist;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Optional<Wishlist> findByUserIdAndProductId(Long userId, Long productId);

    Optional<List<Wishlist>> findAllByUserId(Long userId);

    @Transactional
    void deleteByUserIdAndProductId(Long userId, Long productId);
}
