package com.pantryhub.identityservice.mapper;

import com.pantryhub.identityservice.dto.request.AddressReqDto;
import com.pantryhub.identityservice.dto.response.AddressResDto;
import com.pantryhub.identityservice.dto.response.AuthResDto;
import com.pantryhub.identityservice.dto.response.UserResDto;
import com.pantryhub.identityservice.entity.Address;
import com.pantryhub.identityservice.entity.Users;

public class HelperMapper {

    public static Address mapToAddress(AddressReqDto addressReqDto, Users users) {
        Address newAddress = new Address();
        newAddress.setAddressLine1(addressReqDto.getAddressLine1());
        newAddress.setAddressLine2(addressReqDto.getAddressLine2());
        newAddress.setAddressType(addressReqDto.getAddressType());
        newAddress.setCity(addressReqDto.getCity());
        newAddress.setCountry(addressReqDto.getCountry());
        newAddress.setLandmark(addressReqDto.getLandmark());
        newAddress.setState(addressReqDto.getState());
        newAddress.setZipCode(addressReqDto.getZipCode());
        newAddress.setUsers(users);

        return newAddress;
    }

    public static UserResDto maptoUserResDto(Users user) {
        UserResDto userResDto = new UserResDto();
        userResDto.setId(user.getId()); // Use user.getId() or customUserDetails.getId()
        userResDto.setFirstName(user.getFirstName()); // Set from User entity
        userResDto.setLastName(user.getLastName());   // Set from User entity
//        userResDto.setEmail(user.getEmail());         // Use user.getEmail() or customUserDetails.getUsername()
//        userResDto.setPhone(user.getPhone());         // Set from User entity
        userResDto.setRole(user.getRole());           // Use user.getRole() or get from authorities
//        userResDto.setCreatedAt(user.getCreatedAt()); // Set from User entity
        userResDto.setIsProfileComplete(user.getIsProfileComplete());
//        userResDto.setImg_url(user.getImageUrl());

        return userResDto;

    }

    public static AuthResDto mapToAuthResDto(String token, String email, Users users) {
        AuthResDto authResDto = new AuthResDto();
        authResDto.setAccessToken(token);
        authResDto.setUserResDto(maptoUserResDto(users));

        return authResDto;
    }

    public static AddressResDto mapToAddressResDto(Address address) {
        AddressResDto addressResDto = new AddressResDto();

        addressResDto.setId(address.getId());
        addressResDto.setUserId(address.getUsers().getId());
        addressResDto.setAddressLine1(address.getAddressLine1());
        addressResDto.setAddressLine2(address.getAddressLine2());
        addressResDto.setAddressType(address.getAddressType());
        addressResDto.setCity(address.getCity());
        addressResDto.setCountry(address.getCountry());
        addressResDto.setLandmark(address.getLandmark());
        addressResDto.setState(address.getState());
        addressResDto.setZipCode(address.getZipCode());

        return addressResDto;
    }
}
