package com.pantryhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

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
    private String phone;
    private String role;
    private LocalDateTime createdAt;


}
