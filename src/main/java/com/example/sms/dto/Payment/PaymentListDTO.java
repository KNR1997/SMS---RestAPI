package com.example.sms.dto.Payment;

import com.example.sms.enums.PaymentMethod;
import com.example.sms.entity.Payment;
import lombok.Data;

@Data
public class PaymentListDTO {
    private int id;

    private String studentId;

    private PaymentMethod paymentMethod;

    private Double admission;

    private Double total;

    public PaymentListDTO(Payment payment) {
        this.id = payment.getId();
        this.paymentMethod = payment.getPaymentMethod();
    }
}
