package com.example.sms.repository;

import com.example.sms.dto.Course.CourseStudentCountDTO;
import com.example.sms.entity.*;
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

    @Query("SELECT e.course.name AS courseName, COUNT(e.student.id) AS studentCount " +
            "FROM Enrollment e " +
            "GROUP BY e.course.name")
    List<CourseStudentCountDTO> getCourseStudentCounts();

    @Query("SELECT e FROM Enrollment e " +
            "JOIN e.course c " +
            "JOIN e.student s " +
            "JOIN s.user u WHERE " +
            "(:name IS NULL OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%'))) ")
    Page<Enrollment> searchEnrollment(
            @Param("name") String name,
            Pageable pageable
    );

    boolean existsByCourse(Course course);

    boolean existsByStudent(Student student);


}
