package com.pantryhub.user.service;

import com.pantryhub.user.dto.request.UpdateUserReqDto;
import com.pantryhub.auth.dto.response.AuthResDto;
import com.pantryhub.user.dto.response.CurrentUserResDto;
import com.pantryhub.user.dto.response.UserResDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    CurrentUserResDto getCurrentUser(Authentication authentication);
    AuthResDto updateProfile(UpdateUserReqDto updateUserReqDto, Authentication authentication);
    UserResDto uploadProfileImage(MultipartFile file, Authentication authentication);



}
