package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    Page<Enrollment> findByStudentId(Integer id, Pageable pageable);

    List<Enrollment> findByStudentId(Integer id);

    Enrollment findByStudentAndCourse(Student student, Course course);

    @Query("SELECT DISTINCT s FROM Student s " +
            "JOIN Enrollment e ON e.student = s " +
            "WHERE e.course IN :courses")
    Page<Student> findDistinctStudentsByCourseIn(@Param("courses") List<Course> courses, Pageable pageable);

    List<Enrollment> findByCourse(Course course);

}
