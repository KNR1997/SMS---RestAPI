package com.example.sms.controller;

import com.example.sms.dto.Exam.ExamCreateDTO;
import com.example.sms.dto.Exam.ExamUpdateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.response.Exam.ExamPageDataResponse;
import com.example.sms.dto.response.Exam.ExamPaginatedDataResponse;
import com.example.sms.entity.User;
import com.example.sms.service.CurrentUserService;
import com.example.sms.service.ExamService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/api/exams")
@SecurityRequirement(name = "bearerAuth")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private CurrentUserService currentUserService;


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
        User currentUser = currentUserService.getCurrentUser();


        Page<ExamPaginatedDataResponse> examPaginatedDataResponses = examService.getPaginated(
                pageable,
                search,
                grade
        );

        PaginatedResponse<ExamPaginatedDataResponse> response = new PaginatedResponse<>(examPaginatedDataResponses);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createExam(@RequestBody ExamCreateDTO createDto) {
        examService.create(createDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamPageDataResponse> getExamById(@PathVariable Integer id) {
        ExamPageDataResponse examPageData = examService.getExamPageData(id);
        return ResponseEntity.ok(examPageData);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateExam(@PathVariable Integer id, @RequestBody ExamUpdateDTO updateDTO) {
        examService.update(id, updateDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/results")
    public ResponseEntity<Void> uploadExamResults(
            @PathVariable Integer id,
            @RequestParam("file") MultipartFile file
    ) {
        examService.updateExamResults(id, file);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/generate-result-table")
    public ResponseEntity<Void> generateResultTable(@PathVariable Integer id) {
        examService.generateResultTable(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableExam(@PathVariable Integer id) {
        examService.enableExam(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableExam(@PathVariable Integer id) {
        examService.disableExam(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Integer id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }
}
