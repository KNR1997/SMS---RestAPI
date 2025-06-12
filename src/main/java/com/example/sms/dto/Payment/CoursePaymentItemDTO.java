package com.example.sms.dto.Payment;

import lombok.Data;

import java.util.List;

@Data
public class CoursePaymentItemDTO {

    private Integer courseId;

    private List<Integer> paymentMonths;

}
