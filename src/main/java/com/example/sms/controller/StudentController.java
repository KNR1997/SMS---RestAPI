package com.example.sms.controller;

import com.example.sms.dto.*;
import com.example.sms.entity.Course;
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
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/students")
@SecurityRequirement(name = "bearerAuth")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<Student>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<Student> studentPage = studentService.getAllStudents(pageable);

        PaginatedResponse<Student> response = new PaginatedResponse<>(studentPage);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createStudent(@RequestBody CreateStudentDTO createStudentDTO) {
        Student student = studentService.createStudent(createStudentDTO);
        URI location = URI.create("/students/" + student.getStudentId()); // assuming course has getSlug()
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Integer id) {
        Student student = studentService.getStudentById(id);

        StudentPageDataDTO userPageDataDTO = new StudentPageDataDTO(
                student.getId(),
                student.getUser().getFirstName(),
                student.getUser().getLastName(),
                student.getUser().getEmail(),
                student.getUser().getUsername(),
                student.getDateOfBirth(),
                student.getGrade(),
                student.getGuardianName(),
                student.getContactNumber()
        );

        return ResponseEntity.ok(userPageDataDTO);
    }

    @GetMapping("/{studentId}/courses")
    public ResponseEntity<PaginatedResponse<Course>> getEnrolledCourses(
            @PathVariable Integer studentId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<Course> coursePage = studentService.getEnrolledCourses(studentId, pageable, search);

        PaginatedResponse<Course> response = new PaginatedResponse<>(coursePage);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{studentId}/courses")
    public ResponseEntity<Void> enrollCourse(
            @PathVariable Integer studentId,
            @RequestBody EnrollCourseDTO enrollCourseDTO) {

        studentService.enrollStudentInCourse(studentId, enrollCourseDTO.courseId());
        return ResponseEntity.ok().build();
    }
}
