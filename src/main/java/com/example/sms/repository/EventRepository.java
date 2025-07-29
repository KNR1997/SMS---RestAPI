package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Event;
import com.example.sms.entity.Exam;
import com.example.sms.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Page<Event> findByCourseIn(List<Course> courses, Pageable pageable);

    Optional<Event> findByExam(Exam exam);

    boolean existsByCourse(Course course);

}
