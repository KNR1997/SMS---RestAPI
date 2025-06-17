package com.example.sms.dto.EnrollmentPayment;

import com.example.sms.entity.EnrollmentPayment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DateFormatSymbols;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentPaymentDetailDTO {

    private Integer monthNumber;

    private String monthName;

    private Double amount;

    private LocalDate paymentDate;

    public EnrollmentPaymentDetailDTO(EnrollmentPayment payment) {
        this.monthNumber = payment.getMonthNumber();
        this.monthName = getLastPaidMonthName();
        this.amount = payment.getAmount();
        this.paymentDate = payment.getPaymentDate();
    }

    public String getLastPaidMonthName() {
        if (monthNumber == null || monthNumber == 0) {
            return "_";
        }
        // Month index is 1-based (1 = January, 12 = December)
        return new DateFormatSymbols().getMonths()[monthNumber - 1];
    }
}
