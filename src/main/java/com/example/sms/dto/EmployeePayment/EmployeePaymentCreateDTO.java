package com.example.sms.dto.EmployeePayment;

import com.example.sms.dto.CoursePaymentSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeePaymentCreateDTO {

    private Integer employeeId;

    private Integer monthNumber;

    private Double amount;

    private String reference;

    private List<CoursePaymentSummaryDto> coursePaymentSummaries;

}
