package com.example.sms.controller;

import com.example.sms.dto.Course.CourseCreateDTO;
import com.example.sms.dto.Course.CourseDetailDTO;
import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.entity.Course;
import com.example.sms.entity.User;
import com.example.sms.service.CourseService;
import com.example.sms.service.CurrentUserService;
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
    private CurrentUserService currentUserService;

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<CourseListDTO>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) Boolean is_active
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        User currentUser = currentUserService.getCurrentUser();

        Page<CourseListDTO> coursePage = courseService.getCoursesPaginated(
                pageable,
                search,
                grade,
                currentUser,
                is_active
        );

        PaginatedResponse<CourseListDTO> response = new PaginatedResponse<>(coursePage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<CourseDetailDTO> getCourseBySlug(@PathVariable String slug) {
        Course course = courseService.getCourseBySlug(slug);
        CourseDetailDTO courseDetailDTO = new CourseDetailDTO(course);
        return ResponseEntity.ok(courseDetailDTO);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Void> createCourse(@RequestBody CourseCreateDTO createDto) {
        Course course = courseService.createCourse(createDto);
        URI location = URI.create("/courses/" + course.getSlug()); // assuming course has getSlug()
        return ResponseEntity.created(location).build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCourse(@PathVariable Integer id, @RequestBody CourseCreateDTO updateDto) {
        courseService.updateCourse(id, updateDto);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableCourse(@PathVariable Integer id) {
        courseService.enableCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableCourse(@PathVariable Integer id) {
        courseService.disableCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
