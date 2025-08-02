package com.example.sms.repository;

import com.example.sms.entity.Hall;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HallRepository extends JpaRepository<Hall, Integer> {

    @Query("SELECT h FROM Hall h WHERE " +
            "(:is_active IS NULL OR h.active = :is_active) AND " +
            "(:name IS NULL OR LOWER(h.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    Page<Hall> searchHalls(
            @Param("name") String name,
            @Param("is_active") Boolean is_active,
            Pageable pageable
    );
}
