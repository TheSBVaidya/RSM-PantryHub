package com.pantryhub.repository;

import com.pantryhub.dto.request.AddressReqDto;
import com.pantryhub.dto.response.AddressResDto;
import com.pantryhub.entity.Address;
import com.pantryhub.entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUsers(Users users);

}
