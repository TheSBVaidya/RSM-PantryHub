package com.pantryhub.service;

import com.pantryhub.dto.request.GoogleAuthReqDto;
import com.pantryhub.dto.request.LoginReqDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.entity.Users;

public interface AuthService {

    AuthResDto loginWithGoogle(GoogleAuthReqDto googleAuthReqDto);
    AuthResDto RegisterUser(RegisterReqDto registerReqDto);
    AuthResDto LoginUser(LoginReqDto loginReqDto);

//    String generateToken(Users users);
//    Boolean validateToken(String token);
}
