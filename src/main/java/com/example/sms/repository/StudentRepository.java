package com.example.sms.repository;

import com.example.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Find the highest student ID for the current year
    @Query("SELECT MAX(s.studentId) FROM Student s WHERE s.studentId LIKE 'ST/' || :year || '/%'")
    String findMaxStudentIdByYear(@Param("year") String year);
}
