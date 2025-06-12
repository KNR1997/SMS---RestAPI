package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.enums.GradeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer>, JpaSpecificationExecutor<Course> {

    Optional<Course> findBySlug(String slug);

    boolean existsBySlug(String slug);

    Page<Course> findByGradeType(GradeType gradeType, Pageable pageable);

}
