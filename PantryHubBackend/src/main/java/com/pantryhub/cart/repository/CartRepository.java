package com.pantryhub.cart.repository;

import com.pantryhub.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUsers_Id(Long usersId);

    void deleteByUsers_Id(Long usersId);
}
