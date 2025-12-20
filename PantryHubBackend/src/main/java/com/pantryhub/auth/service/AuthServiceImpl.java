package com.pantryhub.auth.service;

import com.pantryhub.security.CustomUserDetails;
import com.pantryhub.auth.dto.GoogleUserInfo;
import com.pantryhub.auth.dto.request.GoogleAuthReqDto;
import com.pantryhub.auth.dto.request.LoginReqDto;
import com.pantryhub.auth.dto.request.RegisterReqDto;
import com.pantryhub.auth.dto.response.AuthResDto;
import com.pantryhub.auth.dto.response.GoogleTokenResDto;
import com.pantryhub.user.dto.response.UserResDto;
import com.pantryhub.user.entity.Users;
import com.pantryhub.user.repository.UserRepository;
import com.pantryhub.security.JwtTokenProvider;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Value("${google.client.id}")
    private String googleClientId;

    @Value("${google.client.secret}")
    private String googleClientSecret;

    @Value("${google.redirect.uri}")
    private String googleRedirectUri;

    @Value("${google.token.uri}")
    private String googleTokenUri;

    @Value("${google.user-info.uri}")
    private String googleUserInfoUri;

    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResDto loginWithGoogle(GoogleAuthReqDto googleAuthReqDto) {
        //1. Exchange the authentication code for an access token
        String accessToken = getGoogleAccessToken(googleAuthReqDto.getCode());

        //2. Get User Info From Google
        GoogleUserInfo googleUserInfo = getGoogleUserInfo(accessToken);

        //3. Find or create the user in your database
        Users users = findOrCreateUser(googleUserInfo);

        //4. Create your app's JWT token using your existing provide
        CustomUserDetails customUserDetails = new CustomUserDetails(users);
        String appToken = jwtTokenProvider.generateToken(customUserDetails);

        //5. Build and return the same AuthResDto as normal login
        UserResDto userResDto = new UserResDto();
        userResDto.setId(users.getId());
//        userResDto.setEmail(users.getEmail());
        userResDto.setFirstName(users.getFirstName());
        userResDto.setLastName(users.getLastName());
        userResDto.setRole(users.getRole());
//        userResDto.setImg_url(users.getImageUrl());
        userResDto.setIsProfileComplete(users.getIsProfileComplete());

        AuthResDto authResDto = new AuthResDto();
        authResDto.setAccessToken(appToken);
        authResDto.setUserResDto(userResDto);

        return authResDto;
    }

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

        System.out.println("autherntication: "+ authentication);
        System.out.println("customUserDetails" + customUserDetails);
        System.out.println("token: " + token);
        System.out.println("email: " + email);

        return mapToAuthResDto(token, email);

    }

    private AuthResDto mapToAuthResDto(String token, String email) {
        Users user = findUserByEmail(email);
        AuthResDto authResDto = new AuthResDto();
        authResDto.setAccessToken(token);
        authResDto.setUserResDto(maptoUserResDto(user));

        return authResDto;
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

    private Users findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

    private Users findOrCreateUser(GoogleUserInfo googleUserInfo) {

        return userRepository.findByEmail(googleUserInfo.getEmail())
                .orElseGet(() -> {
                    //User not found, so create a new one
                    Users newUser = new Users();
                    newUser.setEmail(googleUserInfo.getEmail());
                    newUser.setFirstName(googleUserInfo.getGiven_name());
                    newUser.setLastName(googleUserInfo.getFamily_name());
                    newUser.setImageUrl(googleUserInfo.getPicture());
                    newUser.setEmailVerified(googleUserInfo.getEmail_verified());
                    newUser.setProvider("GOOGLE");
                    newUser.setRole("ROLE_USER");

//                    String password = "GooglePassword";
//                    newUser.setPassword(passwordEncoder.encode(password));

//                    newUser.setPhone("996746216395");

                    return userRepository.save(newUser);
                });
    }

    private String getGoogleAccessToken(String code) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", code);
        body.add("client_id", googleClientId);
        body.add("client_secret", googleClientSecret);
        body.add("redirect_uri", googleRedirectUri);
        body.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, httpHeaders);

        ResponseEntity<GoogleTokenResDto> response = restTemplate.postForEntity(googleTokenUri, requestEntity, GoogleTokenResDto.class);
        return response.getBody().getAccessToken();
    }

    private GoogleUserInfo getGoogleUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<GoogleUserInfo> response = restTemplate.exchange(googleUserInfoUri, HttpMethod.GET, requestEntity, GoogleUserInfo.class);
        return response.getBody();
    }
}
