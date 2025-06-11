package com.example.sms.controller;

import com.example.sms.dto.Enrollment.EnrollmentDetailDTO;
import com.example.sms.dto.Enrollment.EnrollmentListDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.entity.Enrollment;
import com.example.sms.service.EnrollmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/enrollments")
@SecurityRequirement(name = "bearerAuth")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<EnrollmentListDTO>> getEnrollmentsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<EnrollmentListDTO> enrollmentListDTOPage = enrollmentService.getEnrollmentsPaginated(pageable, search, grade);

        PaginatedResponse<EnrollmentListDTO> response = new PaginatedResponse<>(enrollmentListDTOPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentDetailDTO> getEnrollmentById(@PathVariable Integer id) {
        Enrollment enrollment = enrollmentService.getEnrollmentById(id);
        EnrollmentDetailDTO enrollmentDetailDTO = new EnrollmentDetailDTO(enrollment);
        return ResponseEntity.ok(enrollmentDetailDTO);
    }
}
