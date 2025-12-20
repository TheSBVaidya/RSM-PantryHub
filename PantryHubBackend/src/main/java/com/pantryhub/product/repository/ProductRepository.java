package com.pantryhub.product.repository;

import com.pantryhub.product.entity.Product;
import com.pantryhub.product.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByIdAndIsActiveTrue(Long id);

    List<Product> findByCategoryId_IdAndIsActiveTrue(Long categoryIdId);

    List<Product> findAllByStatus(ProductStatus status);

    Product findByStatusAndId(ProductStatus status, Long id);

    List<Product> findByNameContainingIgnoreCase(String name);
}
