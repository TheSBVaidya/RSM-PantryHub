package com.pantryhub.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CurrentUserResDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
//    private String password;
    private String img_url;
    private String phone;
    private Boolean isProfileComplete;
}
