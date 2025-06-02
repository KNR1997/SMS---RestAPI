package com.example.sms.controller;

import com.example.sms.dto.SubjectDTO;
import com.example.sms.entity.Subject;
import com.example.sms.service.SubjectService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody SubjectDTO subjectDTO) {
        Subject subject = subjectService.createSubject(subjectDTO);
        return ResponseEntity.ok(subject);
    }

}
