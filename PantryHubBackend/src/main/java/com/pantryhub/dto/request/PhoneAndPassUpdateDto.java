package com.pantryhub.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class PhoneAndPassUpdateDto {

//    private Long id;
    private String password;
    private String phone;
}
