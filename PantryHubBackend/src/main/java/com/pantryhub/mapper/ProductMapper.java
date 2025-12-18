package com.pantryhub.mapper;

import com.pantryhub.dto.request.ProductReqDto;
import com.pantryhub.dto.response.ProductResDto;
import com.pantryhub.entity.Category;
import com.pantryhub.entity.Product;
import com.pantryhub.entity.ProductStatus;

public class ProductMapper {

    public static ProductResDto mapToProductResDto(Product product) {
        ProductResDto dto = new ProductResDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSlug(product.getSlug());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setOldPrice(product.getOldPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setUnitOfMeasure(product.getUnitOfMeasure());
        dto.setDealTag(product.getDealTag());
        dto.setStatus(product.getStatus().name());
        dto.setRating(product.getRating());
        dto.setReviewCount(product.getReviewCount());
        dto.setImageUrl(product.getImageUrl());
        dto.setGalleryImages(product.getGalleryImages());
        dto.setTags(product.getTags());
        if (product.getCategoryId() != null) {
            dto.setCategoryId(product.getCategoryId().getId());
            dto.setCategoryName(product.getCategoryId().getName());
        }
        dto.setIsActive(product.getIsActive());

        return dto;
    }

    public static Product mapToProduct(ProductReqDto dto, Category category) {
        if (dto == null)
            return null;

        Product product = new Product();
        product.setName(dto.getName());
        product.setSlug(generateSlug(dto.getName())); //generate slug auto.
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
//        product.setOldPrice(dto.getPrice()); old price stored as null
        product.setCostPrice(dto.getCostPrice());
        product.setStockQuantity(dto.getStockQuantity());
        product.setUnitOfMeasure(dto.getUnitOfMeasure());
        product.setDealTag(dto.getDealTag());
        if (dto.getStatus().equalsIgnoreCase(ProductStatus.ACTIVE.name()))
            product.setStatus(ProductStatus.ACTIVE);
        product.setTags(dto.getTags());
        product.setCategoryId(category);

        return product;
    }

    public static void updateProductFromReqDto(ProductReqDto dto, Product product){
        if (dto == null || product == null)
            return;

        // name & slug
        if (dto.getName() != null) {
            product.setName(dto.getName());
            product.setSlug(generateSlug(dto.getName()));
        }

        // description
        if (dto.getDescription() != null)
            product.setDescription(dto.getDescription());


        // price
        if (dto.getPrice() != null) {
            product.setOldPrice(product.getPrice());
            product.setPrice(dto.getPrice());
        }

        // costPrice
        if (dto.getCostPrice() != null)
            product.setCostPrice(dto.getCostPrice());

        // stock
        if (dto.getStockQuantity() != null)
            product.setStockQuantity(dto.getStockQuantity());

        // unit
        if (dto.getUnitOfMeasure() != null)
            product.setUnitOfMeasure(dto.getUnitOfMeasure());

        // dealTag
        if (dto.getDealTag() != null)
            product.setDealTag(dto.getDealTag());

        // tags (replace)
        if (dto.getTags() != null)
            product.setTags(dto.getTags());

        // category
//        if (dto.getCategoryId() != null)
//            product.setCategoryId(dto.getCategoryId());

        // status string -> enum (handled in service)
        if (dto.getStatus() != null)
            product.setStatus(ProductStatus.valueOf(dto.getStatus().trim().toUpperCase()));

    }

    private static String generateSlug(String name) {
        if (name == null) return null;

        return name.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }
}
