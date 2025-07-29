package com.example.sms.exception;

public class GuardianInUseException extends RuntimeException {

    public GuardianInUseException(String message) {
        super(message);
    }

    public GuardianInUseException(String message, Throwable cause) {
        super(message, cause);
    }
}