package com.example.sms.exception;

import com.example.sms.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppsException.class)
    public ResponseEntity<Map<String, Object>> handleAppException(AppsException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", ex.getMessage());
        body.put("status", ex.getStatusCode());
        return new ResponseEntity<>(body, HttpStatus.valueOf(ex.getStatusCode()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

//    @ExceptionHandler(BadRequestException.class)
//    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
//        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(BadRequestException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SubjectInUseException.class)
    public ResponseEntity<String> handleSubjectInUseException(SubjectInUseException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // or BAD_REQUEST depending on your preference
                .body(ex.getMessage());
    }

    @ExceptionHandler(CourseInUseException.class)
    public ResponseEntity<String> handleCourseInUseException(CourseInUseException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // or BAD_REQUEST depending on your preference
                .body(ex.getMessage());
    }

    @ExceptionHandler(UserInUserException.class)
    public ResponseEntity<String> handleUserInUserException(UserInUserException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // or BAD_REQUEST depending on your preference
                .body(ex.getMessage());
    }

    @ExceptionHandler(StudentInUseException.class)
    public ResponseEntity<String> handleStudentInUseException(StudentInUseException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // or BAD_REQUEST depending on your preference
                .body(ex.getMessage());
    }
}
