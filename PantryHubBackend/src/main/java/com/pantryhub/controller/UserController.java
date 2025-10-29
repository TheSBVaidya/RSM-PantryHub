package com.pantryhub.controller;

import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addAddress")
    public ResponseEntity<AddressResDto> addAddress(@RequestBody AddressReqDto addressReqDto, Authentication authentication){
        String email = authentication.getName();

        AddressResDto newAddress = userService.addAddress(addressReqDto, email);

        return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
    }
}
