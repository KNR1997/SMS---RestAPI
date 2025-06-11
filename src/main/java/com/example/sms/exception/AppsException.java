package com.example.sms.exception;

public class AppsException extends RuntimeException {
    private final int statusCode;

    public AppsException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
