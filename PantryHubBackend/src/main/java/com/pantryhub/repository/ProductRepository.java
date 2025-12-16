package com.pantryhub.repository;

import com.pantryhub.entity.Product;
import com.pantryhub.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByStatus(ProductStatus status);

    Product findByStatusAndId(ProductStatus status, Long id);

    List<Product> findByNameContainingIgnoreCase(String name);
}
