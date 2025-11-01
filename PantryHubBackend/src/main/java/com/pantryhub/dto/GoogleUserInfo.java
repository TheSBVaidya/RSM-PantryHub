package com.pantryhub.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleUserInfo {

    private String sub;
//    private String name;
    private String given_name; //firstName
    private String family_name; //LastName
    private String picture; //Picture uri
    private Boolean email_verified;
    private String email;
}
