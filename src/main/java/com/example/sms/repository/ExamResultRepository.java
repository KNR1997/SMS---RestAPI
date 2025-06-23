package com.example.sms.repository;

import com.example.sms.entity.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamResultRepository extends JpaRepository<ExamResult, Integer> {
}
