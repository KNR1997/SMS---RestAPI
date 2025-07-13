package com.example.sms.controller;

import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.Payment.PaymentDetailDTO;
import com.example.sms.dto.Payment.PaymentListDTO;
import com.example.sms.entity.Payment;
import com.example.sms.service.PaymentService;
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
@RequestMapping("/api/payments")
@SecurityRequirement(name = "bearerAuth")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<PaymentListDTO>> getAllPayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<PaymentListDTO> coursePage = paymentService.getPaymentsPaginated(pageable);

        PaginatedResponse<PaymentListDTO> response = new PaginatedResponse<>(coursePage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDetailDTO> getPaymentById(@PathVariable Integer id) {
        Payment payment = paymentService.getById(id);
        return ResponseEntity.ok(new PaymentDetailDTO(payment));
    }
}
