package com.example.sms.dto.Payment;

import com.example.sms.entity.Payment;
import com.example.sms.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentItemCreateDTO {

    private Payment payment;

    private PaymentType paymentType;

    private Double amount;

    private String description;
}
