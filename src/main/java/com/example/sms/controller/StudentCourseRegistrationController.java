package com.example.sms.controller;

import com.example.sms.dto.request.StudentCourseEnrollmentRequest;
import com.example.sms.service.StudentCourseRegistrationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/students")
@SecurityRequirement(name = "bearerAuth")
public class StudentCourseRegistrationController {

    @Autowired
    private StudentCourseRegistrationService studentCourseRegistrationService;

    @PostMapping("/{studentId}/enrollments")
    public ResponseEntity<?> createStudent(
            @PathVariable Integer studentId,
            @RequestBody StudentCourseEnrollmentRequest request) {

        studentCourseRegistrationService.enrollStudentInCourses(studentId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Student enrolled in courses successfully.");
    }
}
