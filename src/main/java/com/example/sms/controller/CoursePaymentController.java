package com.example.sms.controller;

import com.example.sms.dto.Payment.CoursePaymentCreateDTO;
import com.example.sms.dto.request.CoursePaymentCreateRequest;
import com.example.sms.service.CoursePaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/payments")
@SecurityRequirement(name = "bearerAuth")
public class CoursePaymentController {

    @Autowired
    private CoursePaymentService coursePaymentService;

    @PostMapping
    public ResponseEntity<Void> createCoursePayment(@RequestBody CoursePaymentCreateRequest request) {
        coursePaymentService.createCoursePayment(new CoursePaymentCreateDTO(request));
        return ResponseEntity.noContent().build();
    }

}
