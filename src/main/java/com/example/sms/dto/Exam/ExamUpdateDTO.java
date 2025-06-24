package com.example.sms.dto.Exam;

import com.example.sms.enums.ExamStatusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ExamUpdateDTO {
    private Integer id;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private String reference;

    private ExamStatusType status;

}
