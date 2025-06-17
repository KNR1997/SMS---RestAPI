package com.example.sms.controller;

import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.Student.StudentCreateDTO;
import com.example.sms.dto.Student.StudentDetailDTO;
import com.example.sms.dto.Student.StudentListDTO;
import com.example.sms.entity.Student;
import com.example.sms.service.StudentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("/api/students")
@SecurityRequirement(name = "bearerAuth")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<StudentListDTO>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<StudentListDTO> studentPage = studentService.getStudentsPaginated(pageable);

        PaginatedResponse<StudentListDTO> response = new PaginatedResponse<>(studentPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDetailDTO> getStudentById(@PathVariable Integer id) {
        Student student = studentService.getStudentById(id);
        StudentDetailDTO userPageDataDTO = new StudentDetailDTO(student);
        return ResponseEntity.ok(userPageDataDTO);
    }

    @PostMapping
    public ResponseEntity<Void> createStudent(@RequestBody StudentCreateDTO studentCreateDTO) {
        Student student = studentService.createStudent(studentCreateDTO);
        URI location = URI.create("/students/" + student.getStudentId()); // assuming course has getSlug()
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateStudent(@PathVariable Integer id, @RequestBody StudentCreateDTO studentCreateDTO) {
        studentService.updateStudent(id, studentCreateDTO);
        return ResponseEntity.noContent().build();
    }

}
