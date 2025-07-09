package com.example.sms.repository;

import com.example.sms.entity.Guardian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuardianRepository extends JpaRepository<Guardian, Integer> {

    Optional<Guardian> findByNationalIdentityNumber(String slug);

    boolean existsByNationalIdentityNumber(String slug);


}
