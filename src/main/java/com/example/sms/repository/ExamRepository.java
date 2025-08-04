package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Event;
import com.example.sms.entity.Exam;
import com.example.sms.entity.Subject;
import com.example.sms.enums.GradeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
    boolean existsByCourse(Course course);

    boolean existsByCourse(Event event);

    @Query("SELECT e FROM Exam e " +
            "JOIN Course c ON e.course = c WHERE " +
            "(:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:grade IS NULL OR c.gradeType = :grade)")
    Page<Exam> searchExam(
            @Param("name") String name,
            @Param("grade") GradeType grade,
            Pageable pageable
    );
}
