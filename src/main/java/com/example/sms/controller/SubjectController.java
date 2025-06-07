package com.example.sms.controller;

import com.example.sms.dto.Subject.SubjectCreateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.Subject.SubjectDetailDTO;
import com.example.sms.dto.Subject.SubjectListDTO;
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
    public ResponseEntity<PaginatedResponse<SubjectListDTO>> getAllSubjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<SubjectListDTO> subjectPage = subjectService.getSubjectsPaginated(pageable);

        PaginatedResponse<SubjectListDTO> response = new PaginatedResponse<>(subjectPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<SubjectDetailDTO> getSubjectBySlug(@PathVariable String slug) {
        Subject subject = subjectService.getSubjectBySlug(slug);
        SubjectDetailDTO subjectDetailDTO = new SubjectDetailDTO(subject);
        return ResponseEntity.ok(subjectDetailDTO);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Void> createSubject(@RequestBody SubjectCreateDTO subjectCreateDTO) {
        subjectService.createSubject(subjectCreateDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSubject(@PathVariable Integer id, @RequestBody SubjectCreateDTO updateDto) {
        subjectService.updateSubject(id, updateDto);
        return ResponseEntity.noContent().build();
    }

}
