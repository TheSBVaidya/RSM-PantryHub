package com.pantryhub.identityservice.controller;

import com.pantryhub.identityservice.dto.request.GoogleAuthReqDto;
import com.pantryhub.identityservice.dto.request.LoginReqDto;
import com.pantryhub.identityservice.dto.request.RegisterReqDto;
import com.pantryhub.identityservice.dto.response.AuthResDto;
import com.pantryhub.identityservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

//    @PostMapping("/getToken")
//    public ResponseEntity<String> generateToken(@RequestBody UserCredential userCredential) {
//        String token = authService.generateToken(userCredential);
//        if (token.isEmpty())
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        return ResponseEntity.ok(token);
//}

//    @GetMapping("/validateToken")
//    public ResponseEntity<Boolean> validateToken(@RequestBody TokenReqDto token) {
//        return ResponseEntity.ok(authService.validateToken(token.getToken()));
//    }

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
