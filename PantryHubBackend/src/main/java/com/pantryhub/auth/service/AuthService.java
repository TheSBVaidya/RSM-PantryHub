package com.pantryhub.auth.service;

import com.pantryhub.auth.dto.request.GoogleAuthReqDto;
import com.pantryhub.auth.dto.request.LoginReqDto;
import com.pantryhub.auth.dto.request.RegisterReqDto;
import com.pantryhub.auth.dto.response.AuthResDto;

public interface AuthService {

    AuthResDto loginWithGoogle(GoogleAuthReqDto googleAuthReqDto);
    AuthResDto RegisterUser(RegisterReqDto registerReqDto);
    AuthResDto LoginUser(LoginReqDto loginReqDto);

//    String generateToken(Users users);
//    Boolean validateToken(String token);
}
