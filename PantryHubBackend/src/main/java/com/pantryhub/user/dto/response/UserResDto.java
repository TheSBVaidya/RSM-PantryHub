package com.pantryhub.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserResDto {

    private Long id;
    private String firstName;
    private String lastName;
//    private String email;
//    private String phone;
    private String role;
//    private String img_url;
    private Boolean isProfileComplete;
//    private LocalDateTime createdAt;


}
