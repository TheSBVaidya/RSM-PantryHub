package com.pantryhub.service;

import com.pantryhub.dto.CustomUserDetails;
import com.pantryhub.dto.request.LoginReqDto;
import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.AuthResDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.entity.Users;
import com.pantryhub.repository.UserRepository;
import com.pantryhub.security.JwtTokenProvider;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

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

        UserResDto userResDto = new UserResDto();
        userResDto.setId(savedUser.getId());
        userResDto.setFirstName(savedUser.getFirstName());
        userResDto.setLastName(savedUser.getLastName());
        userResDto.setEmail(savedUser.getEmail());
        userResDto.setPhone(savedUser.getPhone());
        userResDto.setRole(savedUser.getRole());
        userResDto.setCreatedAt(savedUser.getCreatedAt());

        return userResDto;
    }

    @Override
    public AuthResDto LoginUser(LoginReqDto loginReqDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword()));

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(customUserDetails);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserResDto userResDto = new UserResDto();
        userResDto.setId(customUserDetails.getId());
        userResDto.setEmail(customUserDetails.getUsername());
        userResDto.setRole(customUserDetails.getAuthorities().iterator().next().getAuthority());

        AuthResDto authResDto = new AuthResDto();
        authResDto.setAccessToken(token);
        authResDto.setUserResDto(userResDto);

        return authResDto;
    }

}
