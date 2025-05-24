package com.example.sms.controller;

import com.example.sms.dto.CourseDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.entity.Course;
import com.example.sms.service.CourseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/courses")
@SecurityRequirement(name = "bearerAuth")
public class CourseController {

    @Autowired
    private CourseService courseService;

//    @GetMapping
////    public ResponseEntity<List<Course>> getAllCourses() {
////        List<Course> courseList = courseService.getAllCourse();
////        return ResponseEntity.ok(courseList);
////    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<Course>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "id") String orderBy,
            @RequestParam(defaultValue = "desc") String sortedBy,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String search
    ) {
        int adjustedPage = Math.max(page - 1, 0); // prevent negative page numbers
        Page<Course> coursePage = courseService.getAllCourses(adjustedPage, limit, orderBy, sortedBy, language, search);

        PaginatedResponse<Course> response = new PaginatedResponse<>(
                coursePage.getContent(),
                coursePage.getTotalElements(),
                limit,
                page
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Course> getCourseBySlug(@PathVariable String slug) {
        Course course = courseService.getCourseBySlug(slug);
        return ResponseEntity.ok(course);
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody CourseDTO createDto) {
        Course course = courseService.createCourse(createDto);
        return ResponseEntity.ok(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Integer id, @RequestBody CourseDTO updateDto) {
        Course response = courseService.updateCourse(id, updateDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

}
