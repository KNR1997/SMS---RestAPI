package com.example.sms.dto.request;

import com.example.sms.dto.Payment.CoursePaymentItemDTO;
import com.example.sms.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class CoursePaymentCreateRequest {

    private Integer studentId;

    private Double admission;

    private Double totalAmount;

    private PaymentMethod paymentMethod;

    private List<CoursePaymentItemDTO> coursePaymentList;
}
