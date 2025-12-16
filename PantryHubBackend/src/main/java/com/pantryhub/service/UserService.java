package com.pantryhub.service;

import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.request.UpdateUserReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.CurrentUserResDto;
import com.pantryhub.dto.response.UserResDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface UserService {

    CurrentUserResDto getCurrentUser(Authentication authentication);
    AuthResDto updateProfile(UpdateUserReqDto updateUserReqDto, Authentication authentication);
    UserResDto uploadProfileImage(MultipartFile file, Authentication authentication);



}
