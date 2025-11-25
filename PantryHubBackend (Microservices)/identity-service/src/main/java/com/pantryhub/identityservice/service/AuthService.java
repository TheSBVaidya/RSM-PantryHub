package com.pantryhub.identityservice.service;

import com.pantryhub.identityservice.dto.request.GoogleAuthReqDto;
import com.pantryhub.identityservice.dto.request.LoginReqDto;
import com.pantryhub.identityservice.dto.request.RegisterReqDto;
import com.pantryhub.identityservice.dto.response.AuthResDto;
import com.pantryhub.identityservice.entity.Users;

public interface AuthService {

    AuthResDto loginWithGoogle(GoogleAuthReqDto googleAuthReqDto);
    AuthResDto RegisterUser(RegisterReqDto registerReqDto);
    AuthResDto LoginUser(LoginReqDto loginReqDto);

//    String generateToken(Users users);
//    Boolean validateToken(String token);
}
