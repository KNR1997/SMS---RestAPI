package com.example.sms.dto.EnrollmentPayment;

import com.example.sms.entity.EnrollmentPayment;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EnrollmentPaymentDTO {
    private int enrollmentId;
    private Integer monthNumber;
    private Double amount;
    private LocalDate paymentDate;

    public EnrollmentPaymentDTO(EnrollmentPayment enrollmentPayment) {
        this.enrollmentId = enrollmentPayment.getId();
        this.monthNumber = enrollmentPayment.getMonthNumber();
        this.amount = enrollmentPayment.getAmount();
        this.paymentDate = enrollmentPayment.getPaymentDate();
    }
}
