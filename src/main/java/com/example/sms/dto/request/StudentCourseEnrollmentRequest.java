package com.example.sms.dto.request;

import com.example.sms.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class StudentCourseEnrollmentRequest {
    private List<Integer> courseIds;

    private Double admission;

    private PaymentMethod paymentMethod;

    private Double total;
}
