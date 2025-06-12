package com.example.sms.repository;

import com.example.sms.enums.RoleType;
import com.example.sms.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);

    boolean existsByName(RoleType roleAdmin);

}
