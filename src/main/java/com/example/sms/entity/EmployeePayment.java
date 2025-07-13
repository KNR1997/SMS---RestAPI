package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class EmployeePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
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
