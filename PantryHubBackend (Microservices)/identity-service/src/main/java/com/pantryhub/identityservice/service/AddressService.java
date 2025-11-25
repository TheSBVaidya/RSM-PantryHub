package com.pantryhub.identityservice.service;

import com.pantryhub.identityservice.dto.request.AddressReqDto;
import com.pantryhub.identityservice.dto.response.AddressResDto;
import org.springframework.security.core.Authentication;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface AddressService {

    AddressResDto addAddress(AddressReqDto addressReqDto, String email);
    List<AddressResDto> getCurrentUserAddress(Authentication authentication);
    void deleteAddress(Long id, Authentication authentication) throws AccessDeniedException;
    AddressResDto updateAddress(Long id, AddressReqDto addressReqDto, Authentication authentication) throws AccessDeniedException;
}
