package com.example.sms.repository;

import com.example.sms.entity.Exam;
import com.example.sms.entity.ExamResult;
import com.example.sms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamResultRepository extends JpaRepository<ExamResult, Integer> {
    Page<ExamResult> findByExam(Exam exam, Pageable pageable);

    Page<ExamResult> findByStudent(Student student, Pageable pageable);

    boolean existsByExamAndStudent(Exam exam, Student student);
}
