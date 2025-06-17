package com.example.sms.repository;

import com.example.sms.entity.Event;
import com.example.sms.entity.EventHallAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventHallAssignmentRepository extends JpaRepository<EventHallAssignment, Integer> {
    List<EventHallAssignment> findByEvent(Event event);
}
