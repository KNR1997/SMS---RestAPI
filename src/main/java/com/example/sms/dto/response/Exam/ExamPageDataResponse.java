package com.example.sms.dto.response.Exam;

import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.entity.Event;
import com.example.sms.entity.Exam;
import com.example.sms.entity.Hall;
import com.example.sms.enums.EventType;
import com.example.sms.enums.ExamStatusType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class ExamPageDataResponse {
    private int id;

    private CourseListDTO course;

    private Integer capacity;

    private List<Hall> halls;

    private ExamStatusType status;

    private EventType eventType;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private String reference;

    private String code;

    public ExamPageDataResponse(Exam exam, Event event, List<Hall> halls) {
        this.id = exam.getId();
        this.course = new CourseListDTO(event.getCourse());
        this.eventType = event.getEventType();
        this.capacity = exam.getCapacity();
        this.halls = halls;
        this.status = exam.getStatus();
        this.date = event.getDate();
        this.startTime = event.getStartTime();
        this.endTime = event.getEndTime();
        this.reference = event.getReference();
        this.code = event.getCode();
    }
}
