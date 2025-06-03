package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Find the highest student ID for the current year
    @Query("SELECT MAX(s.studentId) FROM Student s WHERE s.studentId LIKE 'ST/' || :year || '/%'")
    String findMaxStudentIdByYear(@Param("year") String year);

    // Find Student by User ID
    Optional<Student> findByUser_Id(Integer userId);

    @Query("SELECT c FROM Student s JOIN s.courses c WHERE s.id = :studentId")
    Page<Course> findCoursesByStudentId(
            @Param("studentId") Integer studentId,
            Pageable pageable);

    // For search support (optional)
    @Query("SELECT c FROM Student s JOIN s.courses c WHERE s.id = :studentId AND LOWER(c.name) LIKE LOWER(concat('%', :search, '%'))")
    Page<Course> findCoursesByStudentIdAndSearch(
            @Param("studentId") Integer studentId,
            @Param("search") String search,
            Pageable pageable);
}
