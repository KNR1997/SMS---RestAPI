package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    List<Enrollment> findByStudentId(Integer id);

//    Enrollment findByStudentAndCourseIn(Student student, Course courses);
    Enrollment findByStudentAndCourse(Student student, Course course);

}
