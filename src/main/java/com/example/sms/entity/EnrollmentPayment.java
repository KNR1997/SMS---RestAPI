package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class EnrollmentPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "enrollment_id", nullable = true)
    private Enrollment enrollment;

    private Integer monthNumber;

    private Double amount;

    private LocalDate paymentDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payment_id", nullable = true)
    private Payment payment;

    public void setPaymentDateToToday() {
        this.paymentDate = LocalDate.now();
    }

}
