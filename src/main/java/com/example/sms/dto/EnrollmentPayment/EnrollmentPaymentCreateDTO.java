package com.example.sms.dto.EnrollmentPayment;

import com.example.sms.entity.Enrollment;
import com.example.sms.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentPaymentCreateDTO {

    private Enrollment enrollment;

    private Integer monthNumber;

    private Double amount;

    private Payment payment;
}
