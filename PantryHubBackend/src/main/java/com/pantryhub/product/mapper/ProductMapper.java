package com.pantryhub.product.mapper;

import com.pantryhub.product.dto.request.ProductReqDto;
import com.pantryhub.product.dto.response.AdditionalInfoResDto;
import com.pantryhub.product.dto.response.MultipleProductResDto;
import com.pantryhub.product.dto.response.ProductResDto;
import com.pantryhub.category.entity.Category;
import com.pantryhub.product.entity.Product;
import com.pantryhub.product.entity.ProductAdditionalInfo;
import com.pantryhub.product.entity.ProductStatus;

import java.time.LocalDate;

import static com.pantryhub.common.util.SlugUtil.toSlug;

public class ProductMapper {

    public static ProductResDto mapToProductResDto(Product product) {
        ProductResDto dto = new ProductResDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSlug(product.getSlug());
        dto.setPrice(product.getPrice());
        dto.setOldPrice(product.getOldPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setUnitOfMeasure(product.getUnitOfMeasure());
        dto.setDealTag(product.getDealTag());
        dto.setStatus(product.getStatus().name());
        dto.setImageUrl(product.getImageUrl());
        dto.setGalleryImages(product.getGalleryImages());
        dto.setTags(product.getTags());

        if (product.getCategoryId() != null) {
            dto.setCategoryId(product.getCategoryId().getId());
            dto.setCategoryName(product.getCategoryId().getName());
        }

        return dto;
    }

    public static MultipleProductResDto mapToMultipleProductResDto(Product product) {
        MultipleProductResDto dto = new MultipleProductResDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setOldPrice(product.getOldPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setDealTag(product.getDealTag());
        dto.setImageUrl(product.getImageUrl());
        if (product.getCategoryId() != null) {
            dto.setCategoryId(product.getCategoryId().getId());
            dto.setCategoryName(product.getCategoryId().getName());
        }
        return dto;
    }

    public static Product mapToProduct(ProductReqDto dto, Category category) {
        if (dto == null)
            return null;

        Product product = new Product();
        product.setName(dto.getName());
        product.setSlug(toSlug(dto.getName())); //generate slug auto.
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
            product.setSlug(toSlug(dto.getName()));
        }

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


        // status string -> enum (handled in service)
        if (dto.getStatus() != null)
            product.setStatus(ProductStatus.valueOf(dto.getStatus().trim().toUpperCase()));

    }

    public static AdditionalInfoResDto mapToAdditionalInfoResDto(ProductAdditionalInfo pai) {
        AdditionalInfoResDto dto = new AdditionalInfoResDto();
        dto.setBrand(pai.getBrand());
        dto.setDescription(pai.getDescription());
        dto.setCountryOfOrigin(pai.getCountryOfOrigin());
        dto.setManufacturer(pai.getManufacturer());
        dto.setExpiryDate(pai.getExpiryDate());
        dto.setShelfLife(pai.getShelfLife());
        dto.setStorageInstructions(pai.getStorageInstructions());
        dto.setFoodType(pai.getFoodType());
        dto.setOrganic(pai.getOrganic());
        dto.setIsReturnable(pai.getIsReturnable());
        dto.setIsRefundable(pai.getIsRefundable());

        return dto;
    }

}
