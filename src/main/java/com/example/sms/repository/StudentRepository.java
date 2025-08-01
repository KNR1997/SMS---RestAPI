package com.example.sms.repository;

import com.example.sms.dto.Course.CourseStudentCountDTO;
import com.example.sms.dto.Student.GradeStudentCountDTO;
import com.example.sms.entity.*;
import com.example.sms.enums.GradeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Find the highest student ID for the current year
    @Query("SELECT MAX(s.studentId) FROM Student s WHERE s.studentId LIKE 'ST/' || :year || '/%'")
    String findMaxStudentIdByYear(@Param("year") String year);

    // Find Student by User ID
    Optional<Student> findByUser_Id(Integer userId);

    Optional<Student> findByUser(User user);

    @Query("SELECT s.gradeType AS grade, COUNT(s.studentId) AS studentCount " +
            "FROM Student s " +
            "GROUP BY s.gradeType")
    List<GradeStudentCountDTO> getGradeStudentCounts();

    @Query("SELECT s FROM Student s " +
            "JOIN s.user u " +
            "WHERE " +
            "(:is_active IS NULL OR s.active = :is_active) AND " +
            "(:name IS NULL OR " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:grade IS NULL OR s.gradeType = :grade) AND " +
            "(:admissionPayed IS NULL OR s.admissionPayed = :admissionPayed)")
    Page<Student> searchStudent(
            @Param("name") String name,
            @Param("grade") GradeType grade,
            @Param("admissionPayed") Boolean admissionPayed,
            @Param("is_active") Boolean is_active,
            Pageable pageable
    );

    boolean existsByUser(User user);

    boolean existsByGuardian(Guardian guardian);

}
