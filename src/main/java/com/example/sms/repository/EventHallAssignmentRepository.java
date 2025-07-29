package com.example.sms.repository;

import com.example.sms.entity.Event;
import com.example.sms.entity.EventHallAssignment;
import com.example.sms.entity.Hall;
import com.example.sms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventHallAssignmentRepository extends JpaRepository<EventHallAssignment, Integer> {
    List<EventHallAssignment> findByEvent(Event event);

    boolean existsByHall(Hall hall);

    boolean existsByEvent(Event event);

}
