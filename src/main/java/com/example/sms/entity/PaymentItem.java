package com.example.sms.entity;

import com.example.sms.enums.PaymentType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PaymentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    private Double amount;

    private String description;

}
