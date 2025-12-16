package com.pantryhub.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class AddressReqDto {

    private String addressLine1;
    private String addressLine2;
    private String landmark;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String addressType;
}
