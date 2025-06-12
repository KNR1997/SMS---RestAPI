package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    Optional<Subject> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsByCode(String code);

}
