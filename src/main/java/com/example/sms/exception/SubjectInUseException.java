package com.example.sms.exception;

public class SubjectInUseException extends RuntimeException {

    public SubjectInUseException(String message) {
        super(message);
    }

    public SubjectInUseException(String message, Throwable cause) {
        super(message, cause);
    }
}