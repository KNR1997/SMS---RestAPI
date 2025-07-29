package com.example.sms.exception;

public class EnrollmentPaymentInUseException extends RuntimeException {

    public EnrollmentPaymentInUseException(String message) {
        super(message);
    }

    public EnrollmentPaymentInUseException(String message, Throwable cause) {
        super(message, cause);
    }
}