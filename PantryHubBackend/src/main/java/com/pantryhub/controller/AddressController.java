package com.pantryhub.controller;

import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addAddress;

    @PostMapping("/addAddress")
    public ResponseEntity<AddressResDto> addAddress(@RequestBody AddressReqDto addressReqDto, Authentication authentication){
        String email = authentication.getName();

        AddressResDto newAddress = addAddress.addAddress(addressReqDto, email);

        return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
    }

    @GetMapping("/me-address")
    public ResponseEntity<List<AddressResDto>> getCurrentUserAddress(Authentication authentication) {
        List<AddressResDto> list = addAddress.getCurrentUserAddress(authentication);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/deleteAddress/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id, Authentication authentication) throws AccessDeniedException {
        addAddress.deleteAddress(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updateAddress/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Long id, @RequestBody AddressReqDto addressReqDto, Authentication authentication) throws AccessDeniedException {
        AddressResDto addressResDto = addAddress.updateAddress(id, addressReqDto, authentication);
        return ResponseEntity.ok(addressResDto);
    }

}
