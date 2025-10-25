package com.pantryhub.service;

import com.pantryhub.dto.request.LoginReqDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.UserResDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

//    UserDetails loadUserByUsername(String email);
    UserResDto RegisterUser(RegisterReqDto registerReqDto);
    AuthResDto LoginUser(LoginReqDto loginReqDto);
}
