package com.example.sms.controller;

import com.example.sms.dto.Course.CoursePaymentSummary;
import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.service.EnrollmentPaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/enrollment-payments")
@SecurityRequirement(name = "bearerAuth")
public class EnrollmentPaymentController {
    @Autowired
    private EnrollmentPaymentService enrollmentPaymentService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<EnrollmentPaymentDTO>> getEnrollmentPaymentByCoursePaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) Integer courseId
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<EnrollmentPaymentDTO> enrollmentPaymentDTOPage = enrollmentPaymentService.getEnrollmentPaymentsByCoursePaginated(
                pageable,
                courseId
        );

        PaginatedResponse<EnrollmentPaymentDTO> response = new PaginatedResponse<>(enrollmentPaymentDTOPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/summary")
    public List<CoursePaymentSummary> getPaymentSummary(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam int monthNumber,
            @RequestParam Long teacherId
    ) {
        return enrollmentPaymentService.getCoursePayments(monthNumber, teacherId);
    }

}
