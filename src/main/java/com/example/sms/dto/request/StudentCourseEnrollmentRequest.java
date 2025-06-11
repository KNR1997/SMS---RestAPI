package com.example.sms.dto.request;

import com.example.sms.entity.EPayment;
import lombok.Data;

import java.util.List;

@Data
public class StudentCourseEnrollmentRequest {
    private List<Integer> courseIds;

    private Double admission;

    private EPayment paymentType;

    private Double total;
}
