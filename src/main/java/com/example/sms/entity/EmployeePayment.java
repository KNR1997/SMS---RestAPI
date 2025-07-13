package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class EmployeePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private User employee;

    private Integer monthNumber;

    private Double amount;

    private LocalDate paymentDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payment_id", nullable = true)
    private Payment payment;

    private String reference;

    public void setPaymentDateToToday() {
        this.paymentDate = LocalDate.now();
    }

}
