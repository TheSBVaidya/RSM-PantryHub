package com.pantryhub.product.dto.response;

import com.pantryhub.review.dto.response.ReviewResDto;
import lombok.Data;

import java.util.List;

@Data
public class ProductDetailsResDto {

    private ProductResDto product;
    private Boolean isWishlisted;
    private AdditionalInfoResDto additionalInfo;
    private List<ReviewResDto> reviews;
}
