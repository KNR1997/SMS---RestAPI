package com.example.sms.dto.response.Event;

import com.example.sms.entity.Course;
import com.example.sms.entity.Event;
import com.example.sms.entity.Hall;
import com.example.sms.enums.EventStatusType;
import com.example.sms.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
public class EventPageDataResponse {
    private int id;

    private String code;

    private EventType eventType;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private String reference;

    private List<Hall> halls;

    private EventStatusType status;

    private Integer courseId;

    public EventPageDataResponse(Event event, List<Hall> halls) {
        this.id = event.getId();
        this.code = event.getCode();
        this.eventType = event.getEventType();
        this.date = event.getDate();
        this.startTime = event.getStartTime();
        this.endTime = event.getEndTime();
        this.reference = event.getReference();
        this.halls = halls;
        this.status = event.getStatus();
        this.courseId = event.getCourse().getId();
    }
}
