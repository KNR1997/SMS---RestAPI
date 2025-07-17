package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CoursePaymentSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;

    private Double courseFee;

    private Integer studentCount;

    private Double income;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_payment_id")
    private EmployeePayment employeePayment;
}
