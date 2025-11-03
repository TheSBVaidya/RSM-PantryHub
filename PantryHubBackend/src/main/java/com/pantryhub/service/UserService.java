package com.pantryhub.service;

import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.request.LoginReqDto;
import com.pantryhub.dto.request.PhoneAndPassUpdateDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.UserResDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

//    UserDetails loadUserByUsername(String email);
    AuthResDto RegisterUser(RegisterReqDto registerReqDto);
    AuthResDto LoginUser(LoginReqDto loginReqDto);

    String updatePhoneAndPass(PhoneAndPassUpdateDto phoneAndPassUpdateDto, String email);
    AddressResDto addAddress(AddressReqDto addressReqDto, String email);

}
