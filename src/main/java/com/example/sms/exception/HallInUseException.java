package com.example.sms.exception;

public class HallInUseException extends RuntimeException {

    public HallInUseException(String message) {
        super(message);
    }

    public HallInUseException(String message, Throwable cause) {
        super(message, cause);
    }
}