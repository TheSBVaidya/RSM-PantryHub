package com.pantryhub.auth.controller;

import com.pantryhub.auth.dto.request.GoogleAuthReqDto;
import com.pantryhub.auth.dto.request.LoginReqDto;
import com.pantryhub.auth.dto.request.RegisterReqDto;
import com.pantryhub.auth.dto.response.AuthResDto;
import com.pantryhub.auth.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "User Registration aur Login ke liye APIs")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginReqDto loginReqDto) {
        AuthResDto authResDto = authService.LoginUser(loginReqDto);
        return ResponseEntity.ok(authResDto);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResDto> registerUser(@RequestBody RegisterReqDto registerReqDto) {

        AuthResDto authResDto = authService.RegisterUser(registerReqDto);

        return new ResponseEntity<>(authResDto, HttpStatus.CREATED);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResDto> loginWithGoogle(@Valid @RequestBody GoogleAuthReqDto googleAuthReqDto) {
        AuthResDto authResDto = authService.loginWithGoogle(googleAuthReqDto);
        return ResponseEntity.ok(authResDto);
    }
}
