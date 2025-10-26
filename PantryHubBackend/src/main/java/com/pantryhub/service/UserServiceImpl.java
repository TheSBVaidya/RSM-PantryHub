package com.pantryhub.service;

import com.pantryhub.dto.CustomUserDetails;
import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.request.LoginReqDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.entity.Address;
import com.pantryhub.entity.Users;
import com.pantryhub.repository.AddressRepository;
import com.pantryhub.repository.UserRepository;
import com.pantryhub.security.JwtTokenProvider;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public UserResDto RegisterUser(RegisterReqDto registerReqDto) {

        Users users = new Users();
        users.setFirstName(registerReqDto.getFirstName());
        users.setLastName(registerReqDto.getLastName());
        users.setEmail(registerReqDto.getEmail());
        users.setPassword(passwordEncoder.encode(registerReqDto.getPassword()));
        users.setPhone(registerReqDto.getPhone());
        users.setRole("ROLE_USER");
        users.setEmailVerified(true);
        users.setImageUrl("not now");
        users.setProvider("Google");

        Users savedUser = userRepository.save(users);

        return maptoUserResDto(savedUser);
    }

    @Override
    public AuthResDto LoginUser(LoginReqDto loginReqDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword()));

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(customUserDetails);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String email = customUserDetails.getUsername();

        return mapToAuthResDto(token, email);

    }

    @Override
    public AddressResDto addAddress(AddressReqDto addressReqDto, String email) {

        Users users = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));

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

        Address savedAddress = addressRepository.save(newAddress);

        return mapToAddressResDto(savedAddress);
    }

    private UserResDto maptoUserResDto(Users user) {
        UserResDto userResDto = new UserResDto();
        userResDto.setId(user.getId()); // Use user.getId() or customUserDetails.getId()
        userResDto.setFirstName(user.getFirstName()); // Set from User entity
        userResDto.setLastName(user.getLastName());   // Set from User entity
        userResDto.setEmail(user.getEmail());         // Use user.getEmail() or customUserDetails.getUsername()
        userResDto.setPhone(user.getPhone());         // Set from User entity
        userResDto.setRole(user.getRole());           // Use user.getRole() or get from authorities
        userResDto.setCreatedAt(user.getCreatedAt()); // Set from User entity

        return userResDto;

    }

    private AuthResDto mapToAuthResDto(String token, String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found after successful login - this should not happen")); // Should not fail if login worked

        AuthResDto authResDto = new AuthResDto();
        authResDto.setAccessToken(token);
        authResDto.setUserResDto(maptoUserResDto(user));

        return authResDto;
    }

    private AddressResDto mapToAddressResDto(Address address) {
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
