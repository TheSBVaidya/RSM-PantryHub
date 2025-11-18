package com.pantryhub.service;

import com.pantryhub.dto.CustomUserDetails;
import com.pantryhub.dto.GoogleUserInfo;
import com.pantryhub.dto.request.GoogleAuthReqDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.GoogleTokenResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.entity.Users;
import com.pantryhub.repository.UserRepository;
import com.pantryhub.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Service
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

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
