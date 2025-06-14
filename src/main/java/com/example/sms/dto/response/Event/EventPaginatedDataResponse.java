package com.example.sms.dto.response.Event;

import com.example.sms.entity.Event;
import com.example.sms.enums.EventType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EventPaginatedDataResponse {

    private String code;

    private EventType eventType;

    private LocalDate date;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    public EventPaginatedDataResponse(Event event) {
        this.code = event.getCode();
        this.eventType = event.getEventType();
        this.date = event.getDate();
        this.startTime = event.getStartTime();
        this.endTime = event.getEndTime();
    }
}
