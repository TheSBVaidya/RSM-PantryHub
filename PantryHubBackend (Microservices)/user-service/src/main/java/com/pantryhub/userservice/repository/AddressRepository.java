package com.pantryhub.userservice.repository;

import com.pantryhub.userservice.entity.Address;
import com.pantryhub.userservice.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUsers(Users users);

}
