package com.pantryhub.user.controller;

import com.pantryhub.user.dto.request.UpdateUserReqDto;
import com.pantryhub.auth.dto.response.AuthResDto;
import com.pantryhub.user.dto.response.CurrentUserResDto;
import com.pantryhub.user.dto.response.UserResDto;
import com.pantryhub.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/me")
    public ResponseEntity<CurrentUserResDto> getCurrentUser(Authentication authentication) {
        CurrentUserResDto currentUserResDto = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(currentUserResDto);
    }

    @PatchMapping("/updateProfile")
    public ResponseEntity<AuthResDto> updateProfile(@RequestBody UpdateUserReqDto updateUserReqDto, Authentication authentication) {
        AuthResDto authResDto = userService.updateProfile(updateUserReqDto, authentication);
        return ResponseEntity.ok(authResDto);
    }

    @PostMapping(value = "/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserResDto> uploadProfileImage(@RequestParam("image")MultipartFile file,  Authentication authentication) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        UserResDto userResDto = userService.uploadProfileImage(file, authentication);

        return ResponseEntity.ok(userResDto);
    }
}
