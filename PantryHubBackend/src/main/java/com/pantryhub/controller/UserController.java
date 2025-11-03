package com.pantryhub.controller;

import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.request.PhoneAndPassUpdateDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResDto> registerUser(@RequestBody RegisterReqDto registerReqDto) {

        AuthResDto authResDto = userService.RegisterUser(registerReqDto);

        return new ResponseEntity<>(authResDto, HttpStatus.CREATED);
    }

    @PostMapping("/addAddress")
    public ResponseEntity<AddressResDto> addAddress(@RequestBody AddressReqDto addressReqDto, Authentication authentication){
        String email = authentication.getName();

        AddressResDto newAddress = userService.addAddress(addressReqDto, email);

        return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
    }

    @PutMapping("/update-phone-pass")
    public ResponseEntity<String> updatePhoneAndPass(@RequestBody PhoneAndPassUpdateDto phoneAndPassUpdateDto, Authentication authentication) {
        String email = authentication.getName();
        String message = userService.updatePhoneAndPass(phoneAndPassUpdateDto, email);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
