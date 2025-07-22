package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Subject;
import com.example.sms.enums.GradeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    Optional<Subject> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsByCode(String code);

    @Query("SELECT s FROM Subject s WHERE " +
            "(:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))) ")
    Page<Subject> searchSubjects(
            @Param("name") String name,
            Pageable pageable
    );

}
