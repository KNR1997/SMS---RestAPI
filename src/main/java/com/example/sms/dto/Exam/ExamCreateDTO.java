package com.example.sms.dto.Exam;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
public class ExamCreateDTO {

    private Integer courseId;

    private Integer capacity;

    private String code;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private String reference;

    private List<Integer> hallIds;

}
