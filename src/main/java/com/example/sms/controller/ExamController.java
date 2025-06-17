package com.example.sms.controller;

import com.example.sms.dto.Exam.ExamCreateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.response.Exam.ExamPaginatedDataResponse;
import com.example.sms.service.ExamService;
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
@RequestMapping("/api/exams")
@SecurityRequirement(name = "bearerAuth")
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<ExamPaginatedDataResponse>> getEventsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<ExamPaginatedDataResponse> examPaginatedDataResponses = examService.getPaginated(pageable, search);

        PaginatedResponse<ExamPaginatedDataResponse> response = new PaginatedResponse<>(examPaginatedDataResponses);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createExam(@RequestBody ExamCreateDTO createDto) {
        examService.create(createDto);
        return ResponseEntity.noContent().build();
    }
}
