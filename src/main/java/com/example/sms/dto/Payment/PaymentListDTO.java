package com.example.sms.dto.Payment;

import com.example.sms.enums.PayerType;
import com.example.sms.enums.PaymentMethod;
import com.example.sms.entity.Payment;
import com.example.sms.enums.PaymentStatusType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentListDTO {
    private int id;

    private PayerType payerType;

    private Double totalAmount;

    private LocalDateTime paymentDate;

    private PaymentMethod paymentMethod;

    private PaymentStatusType status;

    private String firstName;

    private String lastName;

    public PaymentListDTO(Payment payment) {
        this.id = payment.getId();
        this.payerType = payment.getPayerType();
        this.totalAmount = payment.getTotalAmount();
        this.paymentDate = payment.getPaymentDate();
        this.paymentMethod = payment.getPaymentMethod();
        this.status = payment.getStatus();
    }

    public PaymentListDTO(PaymentUserView view) {
        this.id = view.getPaymentId();
        this.totalAmount = view.getPaymentAmount();
        this.paymentDate = view.getPaymentDate();
        this.firstName = view.getFirstName();
        this.lastName = view.getLastName();
    }
}
