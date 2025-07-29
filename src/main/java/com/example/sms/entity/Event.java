package com.example.sms.entity;

import com.example.sms.enums.EventStatusType;
import com.example.sms.enums.EventType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "exam_id", nullable = true)
    private Exam exam;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = true)
    private Course course;

    private String code;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private String reference;

    @Enumerated(EnumType.STRING)
    private EventStatusType status = EventStatusType.PENDING;

    @Column(name = "active")
    private boolean active = true;
}
