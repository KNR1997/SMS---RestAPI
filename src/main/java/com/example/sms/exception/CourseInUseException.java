package com.example.sms.exception;

public class CourseInUseException extends RuntimeException {

    public CourseInUseException(String message) {
        super(message);
    }

    public CourseInUseException(String message, Throwable cause) {
        super(message, cause);
    }
}
