package com.example.sms.controller;

import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.Student.GradeStudentCountDTO;
import com.example.sms.dto.Student.StudentCreateDTO;
import com.example.sms.dto.Student.StudentDetailDTO;
import com.example.sms.dto.Student.StudentListDTO;
import com.example.sms.entity.Student;
import com.example.sms.entity.User;
import com.example.sms.service.CurrentUserService;
import com.example.sms.service.StudentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    private CurrentUserService currentUserService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<StudentListDTO>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) Boolean admissionPayed,
            @RequestParam(required = false) Boolean is_active
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        User currentUser = currentUserService.getCurrentUser();

        Page<StudentListDTO> studentPage = studentService.getStudentsPaginated(
                pageable,
                search,
                grade,
                admissionPayed,
                currentUser,
                is_active
        );

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

    @GetMapping("/students-per-grade")
    public List<GradeStudentCountDTO> getStudentsCountInGrades() {
        return studentService.getStudentsCountInGrades();
    }

    @GetMapping("/{id}/enrolled-courses")
    public ResponseEntity<PaginatedResponse<CourseListDTO>> getStudentEnrolledCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @PathVariable Integer id
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<CourseListDTO> courseListDTOPage = studentService.getStudentEnrolledCourses(pageable, id);

        PaginatedResponse<CourseListDTO> response = new PaginatedResponse<>(courseListDTOPage);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableStudent(@PathVariable Integer id) {
        studentService.enableStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableStudent(@PathVariable Integer id) {
        studentService.disableStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Integer id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
