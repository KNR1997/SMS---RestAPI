package com.example.sms.dto.Payment;

import com.example.sms.entity.EPayment;
import com.example.sms.entity.Payment;
import lombok.Data;

@Data
public class PaymentListDTO {
    private int id;

    private EPayment paymentType;

    private Double admission;

    private Double total;

    public PaymentListDTO(Payment payment) {
        this.id = payment.getId();
        this.paymentType = payment.getPaymentType();
        this.admission = payment.getAdmission();
        this.total = payment.getTotal();
    }
}
