package com.example.sms.dto.Exam;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExamCreateDTO {

    private Integer courseId;

    private Integer capacity;

}
