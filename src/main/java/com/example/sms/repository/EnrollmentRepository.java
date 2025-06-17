package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    Page<Enrollment> findByStudentId(Integer id, Pageable pageable);

    List<Enrollment> findByStudentId(Integer id);

    Enrollment findByStudentAndCourse(Student student, Course course);

}
