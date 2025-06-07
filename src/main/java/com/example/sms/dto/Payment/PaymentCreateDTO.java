package com.example.sms.dto.Payment;

import com.example.sms.entity.EPayment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentCreateDTO {
    private int id;

    private int studentId;

    private Set<Integer> courses;

    private EPayment paymentType;

    private Double admission;

    private Double total;
}
