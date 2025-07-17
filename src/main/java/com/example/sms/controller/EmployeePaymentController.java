package com.example.sms.controller;

import com.example.sms.dto.Course.EmployeePaymentListDTO;
import com.example.sms.dto.EmployeePayment.EmployeePaymentCreateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.service.EmployeePaymentService;
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
@RequestMapping("/api/employee-payments")
@SecurityRequirement(name = "bearerAuth")
public class EmployeePaymentController {

    @Autowired
    private EmployeePaymentService employeePaymentService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<EmployeePaymentListDTO>> getAllEmployeePayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) Integer employeeId
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<EmployeePaymentListDTO> listDTOS = employeePaymentService.getEmployeePaymentsPaginated(
                pageable,
                employeeId
        );

        PaginatedResponse<EmployeePaymentListDTO> response = new PaginatedResponse<>(listDTOS);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createEmployeePayment(@RequestBody EmployeePaymentCreateDTO createDto) {
        employeePaymentService.createEmployeePayment(createDto);
        return ResponseEntity.noContent().build();
    }
}
