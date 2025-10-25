package com.pantryhub.service;

import com.pantryhub.dto.request.RegisterReqDto;
import com.pantryhub.dto.response.UserResDto;

public interface UserService {

    UserResDto RegisterUser(RegisterReqDto registerReqDto);
}
