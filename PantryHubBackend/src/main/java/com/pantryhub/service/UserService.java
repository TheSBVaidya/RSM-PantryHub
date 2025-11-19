package com.pantryhub.service;

import com.pantryhub.dto.request.*;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.CurrentUserResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.entity.Address;
import com.pantryhub.entity.Users;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface UserService {

//    UserDetails loadUserByUsername(String email);
    AuthResDto RegisterUser(RegisterReqDto registerReqDto);
    AuthResDto LoginUser(LoginReqDto loginReqDto);

    String updatePhoneAndPass(PhoneAndPassUpdateDto phoneAndPassUpdateDto, String email);
    AddressResDto addAddress(AddressReqDto addressReqDto, String email);

    CurrentUserResDto getCurrentUser(Authentication authentication);
    List<AddressResDto> getCurrentUserAddress(Authentication authentication);
    void deleteAddress(Long id, Authentication authentication) throws AccessDeniedException;
    AddressResDto updateAddress(Long id, AddressReqDto addressReqDto, Authentication authentication) throws AccessDeniedException;
    AuthResDto updateProfile(UpdateUserReqDto updateUserReqDto, Authentication authentication);

    UserResDto uploadProfileImage(MultipartFile file,  Authentication authentication);


}
