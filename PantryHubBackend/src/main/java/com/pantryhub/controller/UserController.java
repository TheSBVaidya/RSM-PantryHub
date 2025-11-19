package com.pantryhub.controller;

import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.request.PhoneAndPassUpdateDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.request.UpdateUserReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.CurrentUserResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.AccessDeniedException;
import java.util.List;

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

    @GetMapping("/me")
    public ResponseEntity<CurrentUserResDto> getCurrentUser(Authentication authentication) {
        CurrentUserResDto currentUserResDto = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(currentUserResDto);
    }

    @GetMapping("/me-address")
    public ResponseEntity<List<AddressResDto>> getCurrentUserAddress(Authentication authentication) {
        List<AddressResDto> list = userService.getCurrentUserAddress(authentication);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/deleteAddress/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id, Authentication authentication) throws AccessDeniedException {
        userService.deleteAddress(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updateAddress/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Long id, @RequestBody AddressReqDto addressReqDto, Authentication authentication) throws AccessDeniedException {
        AddressResDto addressResDto = userService.updateAddress(id, addressReqDto, authentication);
        return ResponseEntity.ok(addressResDto);
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
