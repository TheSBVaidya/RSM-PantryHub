package com.pantryhub.dto.response;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class AuthResDto {

    private String accessToken;
    private String tokenType = "Bearer";
    private UserResDto userResDto;
}
