package com.example.sms.repository;

import com.example.sms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    Optional<Course> findBySlug(String slug);

    boolean existsBySlug(String slug);

}
