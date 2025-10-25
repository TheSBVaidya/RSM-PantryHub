package com.pantryhub.service;

import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.UserResDto;
import com.pantryhub.entity.Users;
import com.pantryhub.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResDto RegisterUser(RegisterReqDto registerReqDto) {

        Users users = new Users();
        users.setFirstName(registerReqDto.getFirstName());
        users.setLastName(registerReqDto.getLastName());
        users.setEmail(registerReqDto.getEmail());
        users.setPassword(registerReqDto.getPassword());
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
}
