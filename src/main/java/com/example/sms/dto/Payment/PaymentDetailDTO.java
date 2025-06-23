package com.example.sms.dto.Payment;

import com.example.sms.entity.Payment;
import com.example.sms.enums.PayerType;
import com.example.sms.enums.PaymentMethod;
import com.example.sms.enums.PaymentStatusType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentDetailDTO {
    private int id;

    private PayerType payerType;

    private PayerType payeeType;

    private Double totalAmount;

    private LocalDateTime paymentDate;

    private PaymentMethod paymentMethod;

    private String referenceNumber;

    private PaymentStatusType status;

    public PaymentDetailDTO(Payment payment) {
        this.id = payment.getId();
        this.payerType = payment.getPayerType();
        this.payeeType = payment.getPayeeType();
        this.totalAmount = payment.getTotalAmount();
        this.paymentDate = payment.getPaymentDate();
        this.paymentMethod = payment.getPaymentMethod();
        this.referenceNumber = payment.getReferenceNumber();
        this.status = payment.getStatus();
    }
}
