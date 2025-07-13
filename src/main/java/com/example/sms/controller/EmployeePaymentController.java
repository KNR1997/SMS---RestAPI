package com.example.sms.controller;

import com.example.sms.dto.EmployeePayment.EmployeePaymentCreateDTO;
import com.example.sms.service.EmployeePaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/employee-payments")
@SecurityRequirement(name = "bearerAuth")
public class EmployeePaymentController {

    @Autowired
    private EmployeePaymentService employeePaymentService;

//    @PostMapping
//    public ResponseEntity<Void> createEmployeePayment(@RequestBody EmployeePaymentCreateDTO createDto) {
//        employeePaymentService.createEmployeePayment(createDto);
//        return ResponseEntity.noContent().build();
//    }
}
