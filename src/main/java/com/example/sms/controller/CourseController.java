package com.example.sms.controller;

import com.example.sms.dto.CourseDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.entity.Course;
import com.example.sms.service.CourseService;
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

@RestController
@CrossOrigin
@RequestMapping("/api/courses")
@SecurityRequirement(name = "bearerAuth")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<Course>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<Course> coursePage = courseService.getAllCourses(pageable, search, grade);

        PaginatedResponse<Course> response = new PaginatedResponse<>(coursePage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Course> getCourseBySlug(@PathVariable String slug) {
        Course course = courseService.getCourseBySlug(slug);
        return ResponseEntity.ok(course);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody CourseDTO createDto) {
        Course course = courseService.createCourse(createDto);
        URI location = URI.create("/courses/" + course.getSlug()); // assuming course has getSlug()
        return ResponseEntity.created(location).body(course);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Integer id, @RequestBody CourseDTO updateDto) {
        Course response = courseService.updateCourse(id, updateDto);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

}
