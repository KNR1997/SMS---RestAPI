package com.example.sms.entity;

import com.example.sms.enums.EventType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private LocalDate date;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String reference;
}
