package com.example.sms.controller;

import com.example.sms.dto.CourseDTO;
import com.example.sms.entity.Course;
import com.example.sms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courseList = courseService.getAllCourse();
        return ResponseEntity.ok(courseList);
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
    public ResponseEntity<Void> deleteSupplier(@PathVariable Integer id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

}
