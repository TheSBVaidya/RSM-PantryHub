package com.pantryhub.service;

import com.pantryhub.dto.CustomUserDetails;
import com.pantryhub.dto.request.*;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.CurrentUserResDto;
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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private FirebaseStorageService firebaseStorageService;


    @Override
    public AuthResDto RegisterUser(RegisterReqDto registerReqDto) {

        Users users = new Users();
        users.setFirstName(registerReqDto.getFirstName());
        users.setLastName(registerReqDto.getLastName());
        users.setEmail(registerReqDto.getEmail());
        users.setPassword(passwordEncoder.encode(registerReqDto.getPassword()));
        users.setPhone(registerReqDto.getPhone());
        users.setRole("ROLE_USER");
        users.setEmailVerified(true);
        users.setProvider("Register");
        users.setIsProfileComplete(true);

        Users savedUser = userRepository.save(users);

        CustomUserDetails customUserDetails = new CustomUserDetails(savedUser);
        String token = jwtTokenProvider.generateToken(customUserDetails);

        String email = customUserDetails.getUsername();

        return mapToAuthResDto(token, email);
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
    public String updatePhoneAndPass(PhoneAndPassUpdateDto phoneAndPassUpdateDto, String email) {

        Users users = findUserByEmail(email);

        String passwd = phoneAndPassUpdateDto.getPassword();
        String phone = phoneAndPassUpdateDto.getPhone();

        users.setIsProfileComplete(true);
        users.setPhone(phone);
        users.setPassword(passwordEncoder.encode(passwd));

        userRepository.save(users);

        return "Password and phone updated successfully!";
    }

    @Override
    public AddressResDto addAddress(AddressReqDto addressReqDto, String email) {

        Users users = findUserByEmail(email);

        Address newAddress = mapToAddress(addressReqDto);

        Address savedAddress = addressRepository.save(newAddress);

        return mapToAddressResDto(savedAddress);
    }

    @Override
    public CurrentUserResDto getCurrentUser(Authentication authentication) {
        String email = authentication.getName();

        Users users = findUserByEmail(email);

        CurrentUserResDto currentUserResDto = new CurrentUserResDto();
        currentUserResDto.setEmail(users.getEmail());
        currentUserResDto.setFirstName(users.getFirstName());
        currentUserResDto.setLastName(users.getLastName());
        currentUserResDto.setId(users.getId());
//        currentUserResDto.setPassword(users.getPassword());
        currentUserResDto.setPhone(users.getPhone());
        currentUserResDto.setImg_url(users.getImageUrl());

        return currentUserResDto;
    }

    @Override
    public List<AddressResDto> getCurrentUserAddress(Authentication authentication) {

        String email = authentication.getName();

        Users users = findUserByEmail(email);

        List<Address> addresses = addressRepository.findByUsers(users);

        return addresses.stream().map(this::mapToAddressResDto).collect(Collectors.toList());
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

    @Override
    public AuthResDto updateProfile(UpdateUserReqDto updateUserReqDto, Authentication authentication) {
        Users users = findUserByEmail(authentication.getName());

        String firstName = updateUserReqDto.getFirstName();
        String lastName = updateUserReqDto.getLastName();
        String email = updateUserReqDto.getEmail();
        String password = updateUserReqDto.getPassword();
        String phone = updateUserReqDto.getPhone();
        String imageUrl = updateUserReqDto.getImageUrl();

        if (firstName != null)
            users.setFirstName(firstName);

        if (lastName != null)
            users.setLastName(lastName);

        if (email != null && !email.equals(users.getEmail())) {
            if (userRepository.existsByEmail(email)) {
                throw new IllegalArgumentException("Email already in use");
            }
            users.setEmail(email);
            }

        if (password != null)
            users.setPassword(passwordEncoder.encode(password));

        if (phone != null)
            users.setPhone(phone);

        if (imageUrl != null)
            users.setImageUrl(imageUrl);

        Users newUser = userRepository.save(users);

        CustomUserDetails customUserDetails = new CustomUserDetails(newUser);
        String newToken = jwtTokenProvider.generateToken(customUserDetails);

        Authentication currentAuth = SecurityContextHolder.getContext().getAuthentication();
        if (currentAuth != null) {
            Authentication newAuth = new UsernamePasswordAuthenticationToken(
                    customUserDetails,
                    currentAuth.getCredentials(),
                    currentAuth.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(newAuth);
        }


        return mapToAuthResDto(newToken, newUser.getEmail());
    }

    @Override
    public UserResDto uploadProfileImage(MultipartFile file, Authentication authentication) {
        Users users = findUserByEmail(authentication.getName());

        try{
            String imageUrl = firebaseStorageService.uploadFile(file);

            users.setImageUrl(imageUrl);
            Users updatedUser = userRepository.save(users);

            return maptoUserResDto(users);
        } catch (IOException e){
            throw new RuntimeException("Failed to upload image" + e);
        }

    }

    private Address mapToAddress(AddressReqDto addressReqDto) {
        Address newAddress = new Address();
        newAddress.setAddressLine1(addressReqDto.getAddressLine1());
        newAddress.setAddressLine2(addressReqDto.getAddressLine2());
        newAddress.setAddressType(addressReqDto.getAddressType());
        newAddress.setCity(addressReqDto.getCity());
        newAddress.setCountry(addressReqDto.getCountry());
        newAddress.setLandmark(addressReqDto.getLandmark());
        newAddress.setState(addressReqDto.getState());
        newAddress.setZipCode(addressReqDto.getZipCode());

        return newAddress;
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



    private AuthResDto mapToAuthResDto(String token, String email) {
        Users user = findUserByEmail(email);
        AuthResDto authResDto = new AuthResDto();
        authResDto.setAccessToken(token);
        authResDto.setUserResDto(maptoUserResDto(user));

        return authResDto;
    }

    private Users findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }


    private UserResDto maptoUserResDto(Users user) {
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


}
