package com.pantryhub.address.repository;

import com.pantryhub.address.entity.Address;
import com.pantryhub.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUsers(Users users);

}
