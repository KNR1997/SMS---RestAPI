package com.example.sms.controller;

import com.example.sms.dto.Course.CourseStudentCountDTO;
import com.example.sms.dto.Enrollment.EnrollmentDetailDTO;
import com.example.sms.dto.Enrollment.EnrollmentListDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.EnrollmentPayment;
import com.example.sms.entity.User;
import com.example.sms.repository.EnrollmentPaymentRepository;
import com.example.sms.service.CurrentUserService;
import com.example.sms.service.EnrollmentService;
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
@RequestMapping("/api/enrollments")
@SecurityRequirement(name = "bearerAuth")
public class EnrollmentController {

    @Autowired
    private CurrentUserService currentUserService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private EnrollmentPaymentRepository enrollmentPaymentRepository;

    @GetMapping
    public ResponseEntity<PaginatedResponse<EnrollmentListDTO>> getEnrollmentsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) Integer studentId
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        User currentUser = currentUserService.getCurrentUser();

        Page<EnrollmentListDTO> enrollmentListDTOPage = enrollmentService.getEnrollmentsPaginated(
                pageable,
                search,
                grade,
                studentId,
                currentUser
        );

        PaginatedResponse<EnrollmentListDTO> response = new PaginatedResponse<>(enrollmentListDTOPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentDetailDTO> getEnrollmentById(@PathVariable Integer id) {
        Enrollment enrollment = enrollmentService.getEnrollmentById(id);
        List<EnrollmentPayment> payments = enrollmentPaymentRepository.findByEnrollmentId(enrollment.getId());
        EnrollmentDetailDTO enrollmentDetailDTO = new EnrollmentDetailDTO(enrollment, payments);
        return ResponseEntity.ok(enrollmentDetailDTO);
    }

    @PostMapping("/{id}/invoke")
    public ResponseEntity<EnrollmentDetailDTO> invokeEnrollment(@PathVariable Integer id) {
        Enrollment enrollment = enrollmentService.getEnrollmentById(id);
        enrollment = enrollmentService.invokeEnrollment(enrollment);
        return ResponseEntity.ok(new EnrollmentDetailDTO(enrollment));
    }

    @GetMapping("/students-per-course")
    public List<CourseStudentCountDTO> getStudentCountsPerCourse() {
        return enrollmentService.getStudentsCountInCourses();
    }
}
