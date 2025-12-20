package com.pantryhub.review.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class ReviewReqDto {

    private Long productId;
    private Integer rating;
    private String comment;

}
