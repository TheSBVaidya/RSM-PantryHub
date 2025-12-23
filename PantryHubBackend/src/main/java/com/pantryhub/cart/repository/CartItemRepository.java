package com.pantryhub.cart.repository;

import com.pantryhub.cart.entity.Cart;
import com.pantryhub.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
