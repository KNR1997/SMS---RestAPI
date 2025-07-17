package com.example.sms.dto;

import com.example.sms.entity.CoursePaymentSummary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoursePaymentSummaryDto {
    private String courseName;
    private Double courseFee;
    private Integer studentCount;
    private Double income;

    public CoursePaymentSummaryDto(CoursePaymentSummary coursePaymentSummary) {
        this.courseName = coursePaymentSummary.getCourseName();
        this.courseFee = coursePaymentSummary.getCourseFee();
        this.studentCount = coursePaymentSummary.getStudentCount();
        this.income = coursePaymentSummary.getIncome();
    }
}
