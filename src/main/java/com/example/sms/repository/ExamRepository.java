package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Event;
import com.example.sms.entity.Exam;
import com.example.sms.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
    boolean existsByCourse(Course course);

    boolean existsByCourse(Event event);

}
