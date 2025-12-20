package com.pantryhub.auth.dto.response;

import com.pantryhub.user.dto.response.UserResDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class AuthResDto {

    private String accessToken;
    private String tokenType = "Bearer";
    private UserResDto userResDto;
}
