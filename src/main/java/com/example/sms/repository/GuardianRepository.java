package com.example.sms.repository;

import com.example.sms.entity.Guardian;
import com.example.sms.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GuardianRepository extends JpaRepository<Guardian, Integer> {

    Optional<Guardian> findByNationalIdentityNumber(String slug);

    boolean existsByNationalIdentityNumber(String slug);

    @Query("SELECT g FROM Guardian g WHERE " +
            "(:is_active IS NULL OR g.active = :is_active) AND " +
            "LOWER(g.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR " +
            "LOWER(g.lastName) LIKE LOWER(CONCAT('%', :name, '%')) OR " +
            "(:name IS NULL OR LOWER(g.nationalIdentityNumber) LIKE LOWER(CONCAT('%', :name, '%'))) ")
    Page<Guardian> searchGuardian(
            @Param("name") String name,
            @Param("is_active") Boolean is_active,
            Pageable pageable
    );

}
