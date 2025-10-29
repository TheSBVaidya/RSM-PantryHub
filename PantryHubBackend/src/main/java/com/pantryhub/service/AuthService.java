package com.pantryhub.service;

import com.pantryhub.dto.request.GoogleAuthReqDto;
import com.pantryhub.dto.response.AuthResDto;

public interface AuthService {
    AuthResDto loginWithGoogle(GoogleAuthReqDto googleAuthReqDto);
}
