package com.pantryhub.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class RegisterReqDto {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
}
