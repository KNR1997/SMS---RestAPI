package com.example.sms.dto.response.ExamResult;

import com.example.sms.entity.ExamResult;
import lombok.Data;

@Data
public class ExamResultPaginatedDataResponse {

    private Integer id;

    private String studentName;

    private String studentId;

    private String result;

    private String courseName;

    public ExamResultPaginatedDataResponse(ExamResult examResult) {
        this.id = examResult.getId();
        this.studentName = examResult.getStudent().getStudentName();
        this.studentId = examResult.getStudent().getStudentId();
        this.result = examResult.getResult();
        this.courseName = examResult.getExam().getCourse().getName();
    }
}
