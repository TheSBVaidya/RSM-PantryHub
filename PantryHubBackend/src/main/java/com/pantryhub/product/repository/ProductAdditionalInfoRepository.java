package com.pantryhub.product.repository;

import com.pantryhub.product.entity.ProductAdditionalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAdditionalInfoRepository extends JpaRepository<ProductAdditionalInfo, Long> {
}
