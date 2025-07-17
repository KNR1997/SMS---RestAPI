package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "employeePayment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CoursePaymentSummary> coursePaymentSummaries = new ArrayList<>();

    private String reference;

    public void setPaymentDateToToday() {
        this.paymentDate = LocalDate.now();
    }

    public void addCoursePaymentSummary(CoursePaymentSummary summary) {
        summary.setEmployeePayment(this);
        this.coursePaymentSummaries.add(summary);
    }
}
