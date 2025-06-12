package com.example.sms.entity;

import com.example.sms.enums.PayerType;
import com.example.sms.enums.PaymentMethod;
import com.example.sms.enums.PaymentStatusType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private PayerType payerType;

    private Integer payerId;

    @Enumerated(EnumType.STRING)
    private PayerType payeeType;

    private Integer payeeId;

    private Double totalAmount;

    private LocalDateTime paymentDate;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String referenceNumber;

    @Enumerated(EnumType.STRING)
    private PaymentStatusType status;

}
