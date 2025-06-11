package com.example.sms.dto;

import com.example.sms.dto.Enrollment.EnrollmentCreateDTO;
import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentCreateDTO;
import com.example.sms.entity.EPayment;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class EnrollCourseDTO {

    private Integer studentId;

    private Set<Integer> courses;

    private List<EnrollmentCreateDTO> enrollments;

    private List<EnrollmentPaymentCreateDTO> enrollmentPayments;

    private EPayment paymentType;

    private Double admission;

    private Double total;

}
