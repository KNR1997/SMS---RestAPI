package com.example.sms.controller;

import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.SubjectDTO;
import com.example.sms.entity.Subject;
import com.example.sms.service.SubjectService;
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
@RequestMapping("/api/subjects")
@SecurityRequirement(name = "bearerAuth")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<Subject>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<Subject> subjectPage = subjectService.getAllSubjects(pageable);

        PaginatedResponse<Subject> response = new PaginatedResponse<>(subjectPage);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody SubjectDTO subjectDTO) {
        Subject subject = subjectService.createSubject(subjectDTO);
        return ResponseEntity.ok(subject);
    }

}
