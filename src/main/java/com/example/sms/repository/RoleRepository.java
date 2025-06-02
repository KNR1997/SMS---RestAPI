package com.example.sms.repository;

import com.example.sms.entity.ERole;
import com.example.sms.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);

    boolean existsByName(ERole roleAdmin);

}
