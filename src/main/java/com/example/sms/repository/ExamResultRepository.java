package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Exam;
import com.example.sms.entity.ExamResult;
import com.example.sms.entity.Student;
import com.example.sms.enums.GradeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExamResultRepository extends JpaRepository<ExamResult, Integer> {
    Page<ExamResult> findByExam(Exam exam, Pageable pageable);

    Page<ExamResult> findByStudent(Student student, Pageable pageable);

    boolean existsByExamAndStudent(Exam exam, Student student);

    boolean existsByStudent(Student student);

}
