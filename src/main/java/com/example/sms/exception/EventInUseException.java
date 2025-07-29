package com.example.sms.exception;

public class EventInUseException extends RuntimeException {

    public EventInUseException(String message) {
        super(message);
    }

    public EventInUseException(String message, Throwable cause) {
        super(message, cause);
    }
}