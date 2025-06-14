package com.example.sms.dto.Event;

import com.example.sms.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EventUpdateDTO {

    private int id;

    private String code;

    private EventType eventType;

    private LocalDate date;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String reference;
}
