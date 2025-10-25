package com.pantryhub.controller;

import com.pantryhub.dto.request.LoginReqDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.security.JwtTokenProvider;
import com.pantryhub.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "User Registration aur Login ke liye APIs")
public class AuthController {

    @Autowired
    private UserService userService;

    @Operation(summary = "Register a new User", description = "New User Making Account")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User successfully registered"),
            @ApiResponse(responseCode = "400", description = "Invalid input data (e.g., email already exists)")

    })
    @PostMapping("/register")
    public ResponseEntity<UserResDto> registerUser(@RequestBody RegisterReqDto registerReqDto) {

        UserResDto userResDto = userService.RegisterUser(registerReqDto);

        return new ResponseEntity<>(userResDto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginReqDto loginReqDto) {
        AuthResDto authResDto = userService.LoginUser(loginReqDto);
        return ResponseEntity.ok(authResDto);
    }
}
