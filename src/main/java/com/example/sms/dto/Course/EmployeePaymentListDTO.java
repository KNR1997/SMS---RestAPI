package com.example.sms.dto.Course;

import com.example.sms.entity.EmployeePayment;
import com.example.sms.enums.PaymentStatusType;
import com.example.sms.enums.RoleType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeePaymentListDTO {
    private int id;

    private String employeeName;

    private RoleType roleType;

    private Integer monthNumber;

    private Double amount;

    private LocalDate paymentDate;

    private PaymentStatusType status;

    public EmployeePaymentListDTO(EmployeePayment employeePayment) {
        this.id = employeePayment.getId();
        this.employeeName = employeePayment.getEmployee().getUserFullName();
        this.monthNumber = employeePayment.getMonthNumber();
        this.amount = employeePayment.getAmount();
        this.paymentDate = employeePayment.getPaymentDate();
        this.roleType = employeePayment.getEmployee().getRole().getName();
    }
}
