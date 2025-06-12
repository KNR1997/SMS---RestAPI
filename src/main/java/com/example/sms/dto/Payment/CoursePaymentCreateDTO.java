package com.example.sms.dto.Payment;

import com.example.sms.dto.request.CoursePaymentCreateRequest;
import com.example.sms.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoursePaymentCreateDTO {

    private Integer studentId;

    private Double admission;

    private Double totalAmount;

    private PaymentMethod paymentMethod;

    private List<CoursePaymentItemDTO> coursePaymentList;

    public CoursePaymentCreateDTO(CoursePaymentCreateRequest request) {
        this.studentId = request.getStudentId();
        this.admission = request.getAdmission();
        this.totalAmount = request.getTotalAmount();
        this.paymentMethod = request.getPaymentMethod();
        this.coursePaymentList = request.getCoursePaymentList();
    }
}
