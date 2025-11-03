package com.pantryhub.controller;

import com.pantryhub.dto.request.GoogleAuthReqDto;
import com.pantryhub.dto.request.LoginReqDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.security.JwtTokenProvider;
import com.pantryhub.service.AuthService;
import com.pantryhub.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "User Registration aur Login ke liye APIs")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginReqDto loginReqDto) {
        AuthResDto authResDto = userService.LoginUser(loginReqDto);
        return ResponseEntity.ok(authResDto);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResDto> loginWithGoogle(@Valid @RequestBody GoogleAuthReqDto googleAuthReqDto) {
        AuthResDto authResDto = authService.loginWithGoogle(googleAuthReqDto);
        return ResponseEntity.ok(authResDto);
    }
}
