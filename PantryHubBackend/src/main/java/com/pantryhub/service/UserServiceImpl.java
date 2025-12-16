package com.pantryhub.service;

import com.pantryhub.dto.CustomUserDetails;
import com.pantryhub.dto.request.UpdateUserReqDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.CurrentUserResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.entity.Users;
import com.pantryhub.repository.UserRepository;
import com.pantryhub.security.JwtTokenProvider;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.pantryhub.mapper.HelperMapper.mapToAuthResDto;
import static com.pantryhub.mapper.HelperMapper.maptoUserResDto;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FirebaseStorageService firebaseStorageService;



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


        Users users1 = findUserByEmail(newUser.getEmail());
        return mapToAuthResDto(newToken, newUser.getEmail(), users1);
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

    private Users findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

}
