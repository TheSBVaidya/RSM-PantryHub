package com.pantryhub.identityservice.service;

import com.pantryhub.identityservice.dto.request.AddressReqDto;
import com.pantryhub.identityservice.dto.response.AddressResDto;
import com.pantryhub.identityservice.entity.Address;
import com.pantryhub.identityservice.entity.Users;
import com.pantryhub.identityservice.mapper.HelperMapper;
import com.pantryhub.identityservice.repository.AddressRepository;
import com.pantryhub.identityservice.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

import static com.pantryhub.identityservice.mapper.HelperMapper.mapToAddress;
import static com.pantryhub.identityservice.mapper.HelperMapper.mapToAddressResDto;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public AddressResDto addAddress(AddressReqDto addressReqDto, String email) {
        Users users = findUserByEmail(email);

        Address newAddress = mapToAddress(addressReqDto, users);

        Address savedAddress = addressRepository.save(newAddress);

        return mapToAddressResDto(savedAddress);
    }

    @Override
    public List<AddressResDto> getCurrentUserAddress(Authentication authentication) {

        String email = authentication.getName();

        Users users = findUserByEmail(email);

        List<Address> addresses = addressRepository.findByUsers(users);

        return addresses.stream().map(HelperMapper::mapToAddressResDto).collect(Collectors.toList());
    }

    @Override
    public void deleteAddress(Long id, Authentication authentication) throws AccessDeniedException {

        // check user
        String email = authentication.getName();
        Users users = findUserByEmail(email);

        //find address
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Address not found with id: " + id));

        // security check
        if (!address.getUsers().getId().equals(users.getId())) {
            throw new AccessDeniedException("You do not have permission to delete this address.");
        }

        // perform the delete
        addressRepository.deleteById(id);
    }

    @Override
    public AddressResDto updateAddress(Long id, AddressReqDto addressReqDto, Authentication authentication) throws AccessDeniedException {

        String email = authentication.getName();
        Users users = findUserByEmail(email);

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Address not found with id: " + id));

        if (!address.getUsers().getId().equals(users.getId())) {
            throw new AccessDeniedException("You do not have permission to delete this address.");
        }

        address.setAddressLine1(addressReqDto.getAddressLine1());
        address.setAddressLine2(addressReqDto.getAddressLine2());
        address.setAddressType(addressReqDto.getAddressType());
        address.setCity(addressReqDto.getCity());
        address.setCountry(addressReqDto.getCountry());
        address.setLandmark(addressReqDto.getLandmark());
        address.setState(addressReqDto.getState());
        address.setZipCode(addressReqDto.getZipCode());

        Address updatedAddress = addressRepository.save(address);

        return mapToAddressResDto(updatedAddress);
    }

    private Users findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

}
