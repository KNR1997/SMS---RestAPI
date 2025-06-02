package com.example.sms.repository;

import com.example.sms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    Boolean existsByUsername(String username);

    boolean existsByEmail(String slug);

}
