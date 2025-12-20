package com.pantryhub.category.repository;

import com.pantryhub.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByIdAndIsActiveTrue (Long id);
    List<Category> findAllByIsActiveTrue();
    Optional<Category> findBySlugAndIsActiveTrue(String slug);
}
