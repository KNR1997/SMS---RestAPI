package com.example.sms.dto.response.Exam;

import com.example.sms.entity.Exam;
import com.example.sms.enums.ExamStatusType;
import lombok.Data;

@Data
public class ExamPaginatedDataResponse {

    private Integer id;

    private String courseName;

    private ExamStatusType status;

    public ExamPaginatedDataResponse(Exam exam) {
        this.id = exam.getId();
        this.courseName = exam.getCourse().getName();
        this.status = exam.getStatus();
    }
}
