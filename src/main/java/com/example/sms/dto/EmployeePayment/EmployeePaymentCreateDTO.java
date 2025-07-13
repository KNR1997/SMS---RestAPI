package com.example.sms.dto.EmployeePayment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeePaymentCreateDTO {

    private Integer employeeId;

    private Integer monthNumber;

    private Double amount;

}
