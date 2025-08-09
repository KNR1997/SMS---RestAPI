package com.example.sms.controller;

import com.example.sms.dto.ExamResult.ExamResultUpdateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.response.ExamResult.ExamResultPaginatedDataResponse;
import com.example.sms.entity.User;
import com.example.sms.service.CurrentUserService;
import com.example.sms.service.ExamResultService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/examResults")
@SecurityRequirement(name = "bearerAuth")
public class ExamResultController {

    @Autowired
    private ExamResultService examResultService;

    @Autowired
    private CurrentUserService currentUserService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<ExamResultPaginatedDataResponse>> getExamResultsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer examId
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        User currentUser = currentUserService.getCurrentUser();

        Page<ExamResultPaginatedDataResponse> examPaginatedDataResponses = examResultService.getPaginated(
                pageable,
                search,
                examId,
                currentUser
        );

        PaginatedResponse<ExamResultPaginatedDataResponse> response = new PaginatedResponse<>(examPaginatedDataResponses);
        return ResponseEntity.ok(response);
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateExamResult(@PathVariable Integer id, @RequestBody ExamResultUpdateDTO updateDTO) {
        examResultService.update(id, updateDTO);
        return ResponseEntity.noContent().build();
    }

}
