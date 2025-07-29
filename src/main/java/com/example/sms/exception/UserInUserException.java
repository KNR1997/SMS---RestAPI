package com.example.sms.exception;

public class UserInUserException extends RuntimeException {

    public UserInUserException(String message) {
        super(message);
    }

    public UserInUserException(String message, Throwable cause) {
        super(message, cause);
    }
}