package com.example.sms.dto.Payment;

import java.time.LocalDateTime;

public interface PaymentUserView {
    int getPaymentId();

    Double getPaymentAmount();

    LocalDateTime getPaymentDate();

    String getFirstName();

    String getLastName();
}
