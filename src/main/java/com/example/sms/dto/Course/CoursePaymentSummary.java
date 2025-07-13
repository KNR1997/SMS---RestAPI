package com.example.sms.dto.Course;

import java.math.BigDecimal;

public interface CoursePaymentSummary {

    String getCourseName();
    BigDecimal getCourseFee();

    BigDecimal getIncome();

    Long getStudentCount();

    Integer getMonthNumber();
}
