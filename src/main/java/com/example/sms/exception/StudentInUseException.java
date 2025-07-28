package com.example.sms.exception;

public class StudentInUseException extends RuntimeException {

    public StudentInUseException(String message) {
        super(message);
    }

    public StudentInUseException(String message, Throwable cause) {
        super(message, cause);
    }
}