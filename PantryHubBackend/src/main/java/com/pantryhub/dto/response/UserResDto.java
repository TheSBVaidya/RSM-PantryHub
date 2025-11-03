package com.pantryhub.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserResDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
//    private String phone;
    private String role;
    private String img_url;
    private Boolean isProfileComplete;
//    private LocalDateTime createdAt;


}
